export default function Chip({ text, imageUrl, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 bg-slate-800/80 pl-1 pr-2 py-1 text-sm shadow-sm">
      {imageUrl && (
        <img
          src={imageUrl.startsWith("http") ? imageUrl : `http://localhost:8080${imageUrl}`}
          alt=""
          className="h-6 w-6 rounded-full object-cover bg-slate-700 border border-slate-600"
        />
      )}
      <span className={`${imageUrl ? "" : "pl-2"} text-slate-200`}>{text || <i className="text-slate-500">Sem texto</i>}</span>
      <button
        type="button"
        className="ml-1 rounded-full p-0.5 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
        onClick={onRemove}
        aria-label="Remove"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </button>
    </span>
  );
}
