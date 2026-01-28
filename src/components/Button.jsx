export default function Button({ children, className = "", ...props }) {
  // Simple check: if the user provided a bg- class, don't apply the default
  const defaultBg = className.includes("bg-") ? "" : "bg-slate-700";
  const defaultText = className.includes("text-") ? "" : "text-slate-100";
  const defaultBorder = className.includes("border-") ? "" : "border-slate-600";

  return (
    <button
      className={
        `rounded-xl px-4 py-2 font-medium shadow-sm border ${defaultBg} ${defaultText} ${defaultBorder} hover:bg-opacity-90 active:scale-[0.99] transition-all ` +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
