import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Chip from "./Chip.jsx";

export default function SortableChip({ id, text, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={isDragging ? "opacity-50" : ""}>
            <Chip text={text} onRemove={onRemove} />
        </div>
    );
}
