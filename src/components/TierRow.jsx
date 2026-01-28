import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import ItemCard from "./ItemCard.jsx";

export default function TierRow({ id, title, itemIds, itemsById, index }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    // Alternating background for visual separation (slate theme)
    const bgClass = index % 2 === 0 ? "bg-slate-800/50" : "bg-slate-800/30";

    return (
        <div className={`flex w-full min-h-[120px] border-b border-slate-700/50 ${bgClass}`}>
            {/* Label / Header (Left Side) */}
            <div className="w-32 sm:w-40 flex-shrink-0 flex items-center justify-center text-center p-3 border-r border-slate-700/50 bg-gradient-to-br from-indigo-900/30 to-purple-900/20">
                <span className="text-lg sm:text-xl font-bold text-indigo-300 break-all">
                    {title}
                </span>
            </div>

            {/* Droppable Area (Right Side) */}
            <div
                ref={setNodeRef}
                className={`flex-1 flex flex-wrap content-start gap-2 p-3 transition-colors ${isOver ? "bg-indigo-500/10 ring-2 ring-indigo-500/30 ring-inset" : ""
                    }`}
            >
                <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                    {itemIds.map((itemId) => (
                        <ItemCard key={itemId} id={itemId} item={itemsById[itemId]} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
