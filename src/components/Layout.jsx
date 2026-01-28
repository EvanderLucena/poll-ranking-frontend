import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all">
            Poll Ranking
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">
              Explorar
            </Link>
            <Link to="/create" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">
              Criar Nova
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        Built with Spring Boot + React
      </footer>
    </div>
  );
}
