export default function Input(props) {
  return (
    <input
      className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-500 transition-all"
      {...props}
    />
  );
}
