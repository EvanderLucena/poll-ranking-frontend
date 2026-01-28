import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { api } from "../lib/api.js";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import Chip from "../components/Chip.jsx";
import SortableChip from "../components/SortableChip.jsx";
import ImageUpload from "../components/ImageUpload.jsx";

export default function CreatePoll() {
  const nav = useNavigate();

  const [title, setTitle] = useState("");

  // Categories
  const [categoryDraft, setCategoryDraft] = useState("");
  const [categories, setCategories] = useState([]);

  // Items
  const [itemText, setItemText] = useState("");
  const [itemImage, setItemImage] = useState(""); // URL
  const [items, setItems] = useState([]);

  const [creating, setCreating] = useState(false);

  const canCreate = useMemo(() => {
    return title.trim().length > 0 && categories.length >= 2 && items.length >= 2;
  }, [title, categories, items]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function addCategory() {
    const c = categoryDraft.trim();
    if (!c) return;
    if (categories.includes(c)) return;
    setCategories([...categories, c]);
    setCategoryDraft("");
  }

  function addItem() {
    const txt = itemText.trim();
    const img = itemImage.trim();

    if (!txt && !img) return;

    // Check duplicates? (Only if text matches?)
    // Allow duplicates for now or just check text if present
    if (txt && items.some(i => i.text === txt && !i.imageUrl && !img)) {
      // simple duplicate check for text-only items
      return;
    }

    setItems([...items, { text: txt, imageUrl: img }]);
    setItemText("");
    setItemImage("");
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function submit() {
    if (!canCreate) return;
    setCreating(true);
    try {
      const res = await api.post("/api/polls", {
        title,
        categories,
        items, // Send array of {text, imageUrl}
      });
      nav(res.data.link);
    } catch (err) {
      console.error("Failed to create poll:", err);
      alert("Erro ao criar enquete: " + (err.response?.data?.error || err.message));
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-50">Criar enquete (Tier List)</h2>
        <p className="text-sm text-slate-400 mt-1">
          Defina o título, as categorias (arraste para ordenar) e os itens (texto ou imagens).
        </p>

        <div className="mt-6 grid gap-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Título</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Melhores Animes de 2024"
            />
          </div>

          {/* Categorias */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Categorias (ordem importa)</label>
            <div className="flex gap-2 mb-3">
              <Input
                value={categoryDraft}
                onChange={(e) => setCategoryDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                placeholder="Nova categoria..."
                className="flex-1"
                autoComplete="off"
              />
              <Button type="button" onClick={addCategory}>Adicionar</Button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={categories} strategy={horizontalListSortingStrategy}>
                <div className="flex flex-wrap gap-2 rounded-xl bg-slate-900/50 p-3 min-h-[50px] border border-dashed border-slate-700/50">
                  {categories.length === 0 && <span className="text-slate-500 text-sm italic">Nenhuma categoria ainda...</span>}
                  {categories.map((c) => (
                    <SortableChip key={c} id={c} text={c} onRemove={() => setCategories(categories.filter((x) => x !== c))} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Itens */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Itens para classificar</label>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 flex gap-2">
                {/* Image Upload Button */}
                <ImageUpload onUpload={(url) => setItemImage(url)} />

                {/* Text Input */}
                <div className="flex-1 relative">
                  <Input
                    value={itemText}
                    onChange={(e) => setItemText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                    placeholder={itemImage ? "Legenda da imagem (opcional)" : "Nome do item..."}
                    className={itemImage ? "pl-10" : ""}
                    autoComplete="off"
                  />
                  {itemImage && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded overflow-hidden border border-slate-600 bg-slate-800">
                      <img src={`http://localhost:8080${itemImage}`} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                  {itemImage && (
                    <button
                      onClick={() => setItemImage("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                      title="Remover imagem"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
              <Button type="button" onClick={addItem}>Adicionar</Button>
            </div>

            <div className="flex flex-wrap gap-2 rounded-xl bg-slate-900/50 p-3 min-h-[50px] border border-dashed border-slate-700/50">
              {items.length === 0 && <span className="text-slate-500 text-sm italic">Nenhum item adicionado...</span>}
              {items.map((it, idx) => (
                <Chip
                  key={idx}
                  text={it.text}
                  imageUrl={it.imageUrl}
                  onRemove={() => removeItem(idx)}
                />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="button"
              className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white ${!canCreate ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20"}`}
              onClick={submit}
              disabled={!canCreate || creating}
            >
              {creating ? "Criando Enquete..." : "Criar Enquete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
