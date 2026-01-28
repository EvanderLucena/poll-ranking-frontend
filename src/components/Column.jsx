import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import ItemCard from "./ItemCard.jsx";

export default function Column({ id, title, itemIds, itemsById }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border p-3 shadow-sm min-w-[260px] transition-colors ${isOver ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
        }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-gray-500">{itemIds.length}</span>
      </div>

      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col gap-2 min-h-[100px]">
          {itemIds.map((itemId) => (
            <ItemCard key={itemId} id={itemId} item={itemsById[itemId]} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
