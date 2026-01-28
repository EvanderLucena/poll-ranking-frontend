import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api.js";
import Button from "../components/Button.jsx";

export default function ResultsPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [pRes, sRes] = await Promise.all([
          api.get(`/api/polls/${id}`),
          api.get(`/api/polls/${id}/stats`),
        ]);
        if (!mounted) return;
        setPoll(pRes.data);
        setStats(sRes.data);
      } catch (e) {
        setError(e?.response?.data?.error || e.message || "Erro ao carregar estatísticas");
      } finally {
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="text-slate-400 p-5">Carregando...</div>;
  if (error) return <div className="text-red-400 p-5">{error}</div>;
  if (!poll || !stats) return null;

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-50">Estatísticas</h2>
            <p className="text-sm text-slate-400 mt-1">{poll.title}</p>
            <p className="text-sm text-slate-400 mt-1">
              Total de respostas: <b className="text-indigo-300">{stats.totalVotes}</b>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to={`/poll/${poll.id}`}><Button>Voltar pra votação</Button></Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-50 mb-4">Detalhes por item</h3>
        <div className="grid gap-4">
          {poll.items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-700/50 bg-slate-900/30 overflow-hidden">
              {/* Item Header with Large Image */}
              <div className="bg-slate-800/50 p-6 border-b border-slate-700/50">
                <div className="flex flex-col items-center gap-3">
                  {item.imageUrl && (
                    <img
                      src={`http://localhost:8080${item.imageUrl}`}
                      alt={item.text || ""}
                      className="h-40 w-40 rounded-lg object-cover bg-slate-700 border-2 border-slate-600 shadow-xl"
                    />
                  )}
                  {item.text && (
                    <h4 className="text-lg font-semibold text-slate-100 text-center">{item.text}</h4>
                  )}
                  {!item.text && !item.imageUrl && (
                    <h4 className="text-lg font-semibold text-slate-400 italic">Item sem nome</h4>
                  )}
                </div>
              </div>

              {/* Category Stats */}
              <div className="divide-y divide-slate-700/30">
                {poll.categories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between px-4 py-3 hover:bg-slate-800/30 transition-colors">
                    <span className="text-slate-300 font-medium">{cat}</span>
                    <span className="text-slate-100 font-semibold tabular-nums">
                      {stats.results?.[item.id]?.[cat] || 0} <span className="text-slate-400 font-normal">({stats.percentages?.[item.id]?.[cat] || 0}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
