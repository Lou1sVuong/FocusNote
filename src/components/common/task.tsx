import React from "react";
import { GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskProps {
  id: string;
  content: string;
  status: "todo" | "inProgress" | "done";
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  content,
  status,
  onDragStart,
  onDelete,
}) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "todo":
        return "bg-indigo-400 bg-opacity-20 hover:bg-opacity-30";
      case "inProgress":
        return "bg-amber-400 bg-opacity-20 hover:bg-opacity-30";
      case "done":
        return "bg-teal-400 bg-opacity-20 hover:bg-opacity-30";
      default:
        return "bg-white bg-opacity-20 hover:bg-opacity-30";
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className={`${getBackgroundColor()} p-3 mb-2 rounded-lg border border-gray-300 cursor-move flex items-center group transition-all duration-200`}
    >
      <GripVertical className="h-4 w-4 mr-2 text-gray-500 opacity-50 hover:opacity-100 transition-opacity duration-200" />
      <span className="flex-grow text-black">{content}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <X className="h-4 w-4 text-gray-600 hover:text-red-600" />
      </Button>
    </div>
  );
};
