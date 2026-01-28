import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DndContext, useDroppable, pointerWithin } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { api } from "../lib/api.js";
import { getVoterToken } from "../lib/voterToken.js";
import Button from "../components/Button.jsx";
import TierRow from "../components/TierRow.jsx";
import ItemCard from "../components/ItemCard.jsx";

export default function PollPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // containers: "UNASSIGNED" + one per category
  const [containers, setContainers] = useState({});
  const [itemsById, setItemsById] = useState({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/polls/${id}`);
        if (!mounted) return;
        const p = res.data;
        setPoll(p);

        const map = {};
        p.items.forEach((it) => (map[it.id] = it));
        setItemsById(map);

        const initial = { UNASSIGNED: p.items.map((it) => it.id) };
        p.categories.forEach((c) => (initial[c] = []));
        setContainers(initial);
      } catch (e) {
        setError(e?.response?.data?.error || e.message || "Erro ao carregar enquete");
      } finally {
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  function findContainer(itemId) {
    for (const cId of Object.keys(containers)) {
      if (containers[cId].includes(itemId)) return cId;
    }
    return null;
  }

  function onDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const from = findContainer(activeId);
    const to = findContainer(overId) || overId;

    if (!from || !to) return;
    if (from === to) {
      const oldIndex = containers[from].indexOf(activeId);
      const newIndex = containers[from].indexOf(overId);
      if (oldIndex !== newIndex && newIndex >= 0) {
        setContainers((prev) => ({
          ...prev,
          [from]: arrayMove(prev[from], oldIndex, newIndex),
        }));
      }
      return;
    }

    setContainers((prev) => {
      const next = { ...prev };
      next[from] = next[from].filter((x) => x !== activeId);

      const overIndex = next[to].indexOf(overId);
      if (overIndex >= 0) {
        next[to] = [...next[to].slice(0, overIndex), activeId, ...next[to].slice(overIndex)];
      } else {
        next[to] = [...next[to], activeId];
      }
      return next;
    });
  }

  async function submitVote() {
    if (!poll) return;

    const unassignedCount = containers.UNASSIGNED?.length || 0;
    if (unassignedCount > 0) {
      const confirmed = window.confirm(
        `Você tem ${unassignedCount} item(s) não classificado(s).\n\nDeseja enviar o voto mesmo assim? Os itens não classificados não contarão pontos.`
      );
      if (!confirmed) return;
    }

    setError("");
    setSubmitting(true);

    const classifications = {};
    poll.categories.forEach((cat) => {
      (containers[cat] || []).forEach((item) => {
        classifications[item] = cat;
      });
    });

    try {
      await api.post(`/api/polls/${poll.id}/votes`, {
        voterToken: getVoterToken(poll.id),
        classifications,
      });
      nav(`/results/${poll.id}`);
    } catch (e) {
      const msg = e?.response?.data?.error || e.message || "Erro ao enviar voto";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="text-gray-600">Carregando...</div>;
  if (error && !poll) return <div className="text-red-600">{error}</div>;
  if (!poll) return null;

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 p-4 mb-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-50">{poll.title}</h2>
            <div className="text-xs text-slate-400 mt-1 flex gap-4">
              <span>Link: {window.location.origin + "/poll/" + poll.id}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={submitVote}
              disabled={submitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-500/20"
            >
              {submitting ? "Enviando..." : "Enviar Voto"}
            </Button>
            <Button
              onClick={() => nav(`/results/${poll.id}`)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 border-slate-600 shadow-md"
            >
              Ver Estatísticas
            </Button>
          </div>
        </div>
        {error && <div className="max-w-7xl mx-auto mt-2 text-red-300 text-sm bg-red-900/20 border border-red-800/50 rounded px-3 py-2">{error}</div>}
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4">

        <DndContext collisionDetection={pointerWithin} onDragEnd={onDragEnd}>

          {/* Tier List Area */}
          <div className="border border-slate-700/50 bg-slate-800/50 shadow-2xl mb-8 rounded-lg overflow-hidden">
            {poll.categories.map((cat, idx) => (
              <TierRow
                key={cat}
                id={cat}
                title={cat}
                itemIds={containers[cat] || []}
                itemsById={itemsById}
                index={idx}
              />
            ))}
          </div>

          {/* Unassigned Items Pool Component */}
          <PoolDropArea
            items={containers.UNASSIGNED || []}
            itemsById={itemsById}
          />

        </DndContext>
      </div>
    </div>
  );
}

// Sub-component for the pool to properly use useDroppable context
function PoolDropArea({ items, itemsById }) {
  const { setNodeRef, isOver } = useDroppable({ id: "UNASSIGNED" });
  const count = items.length;

  return (
    <div
      ref={setNodeRef}
      className={`p-5 rounded-xl border-2 border-dashed transition-all ${isOver
          ? "border-indigo-500/70 bg-indigo-900/20 shadow-inner ring-2 ring-indigo-500/20"
          : count === 0
            ? "border-emerald-600/50 bg-emerald-900/10"
            : "border-slate-700/50 bg-slate-800/30 shadow-lg"
        }`}
    >
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider flex items-center justify-between">
        <span>{count === 0 ? "✅ Tudo classificado!" : "Itens para classificar"}</span>
        {count > 0 && <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{count} restantes</span>}
      </h3>

      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3 min-h-[140px]">
          {items.map((itemId) => (
            <ItemCard key={itemId} id={itemId} item={itemsById[itemId]} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
