export default function Input({ className = "", ...props }) {
  return (
    <div className={`relative w-full h-12 rounded-xl border border-slate-700/50 bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500/50 transition-all ${className}`}>
      <input
        className="w-full h-full bg-transparent text-slate-100 px-4 placeholder:text-slate-500 outline-none border-none"
        {...props}
      />
    </div>
  );
}
