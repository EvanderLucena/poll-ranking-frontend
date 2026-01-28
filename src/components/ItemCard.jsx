import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ItemCard({ id, item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const imgUrl = item.imageUrl ? `http://localhost:8080${item.imageUrl}` : null;
  const hasImage = !!imgUrl;

  // Image-focused design (Larger Square) - Slate theme
  if (hasImage) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={
          "relative group h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-800 border-2 border-slate-600/50 cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20 transition-all " +
          (isDragging ? "opacity-50 z-50 ring-4 ring-indigo-500 scale-105 shadow-2xl shadow-indigo-500/40" : "")
        }
        title={item.text}
      >
        <img src={imgUrl} alt={item.text} className="h-full w-full object-cover" />

        {/* Legend on hover if text exists */}
        {item.text && (
          <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-slate-100 text-center font-semibold leading-tight line-clamp-4">{item.text}</span>
          </div>
        )}
      </div>
    );
  }

  // Text-only design (Box) - Slate theme with gradient
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={
        "h-28 w-36 flex items-center justify-center p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-indigo-500/50 cursor-grab active:cursor-grabbing hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/30 text-white text-center text-sm font-bold overflow-hidden break-words shadow-md transition-all " +
        (isDragging ? "opacity-50 ring-4 ring-indigo-400 z-50 scale-105 shadow-2xl shadow-indigo-500/50" : "")
      }
    >
      {item.text || "Item"}
    </div>
  );
}
