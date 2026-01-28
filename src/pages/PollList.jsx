import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import Button from "../components/Button";

export default function PollList() {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/api/polls")
            .then((res) => {
                setPolls(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load polls. Ensure backend is running.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center text-slate-400">Loading polls...</div>;
    if (error) return <div className="p-10 text-center text-red-400">{error}</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-50">Enquetes Recentes</h1>
                <Link to="/create">
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-500/20">Criar Nova Enquete</Button>
                </Link>
            </div>

            {polls.length === 0 ? (
                <div className="text-center py-10 bg-slate-800/50 rounded-lg border border-dashed border-slate-700/50">
                    <p className="text-slate-400 mb-4">Nenhuma enquete encontrada.</p>
                    <Link to="/create">
                        <Button>Criar a primeira!</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {polls.map((poll) => (
                        <Link key={poll.id} to={`/poll/${poll.id}`} className="block group">
                            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all h-full flex flex-col">
                                <h3 className="font-semibold text-lg mb-2 text-slate-100 group-hover:text-indigo-300 transition-colors">
                                    {poll.title}
                                </h3>
                                <div className="mt-auto text-sm text-slate-400 flex justify-between items-center">
                                    <span>{poll.items.length} itens</span>
                                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">{poll.categories.length} tiers</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-700/50 flex gap-2">
                                    <Link
                                        to={`/poll/${poll.id}`}
                                        className="flex-1 text-center text-sm font-medium text-slate-200 bg-slate-700/50 py-2 rounded hover:bg-slate-600/50 transition-colors"
                                    >
                                        Votar
                                    </Link>
                                    <Link
                                        to={`/results/${poll.id}`}
                                        className="flex-1 text-center text-sm font-medium text-indigo-300 bg-indigo-900/30 py-2 rounded hover:bg-indigo-800/40 transition-colors"
                                    >
                                        Ver Resultados
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
