import { Task } from "@/components/common/task";
import React from "react";

interface ColumnProps {
  id: "todo" | "inProgress" | "done";
  title: string;
  tasks: { id: string; content: string; status: string }[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: "todo" | "inProgress" | "done") => void;
  onDelete: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  onDelete,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-black select-none">
        {title}
      </h2>
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, id)}
        className="min-h-[200px]"
      >
        {tasks
          .filter((task) => task.status === id)
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              content={task.content}
              status={task.status as "todo" | "inProgress" | "done"}
              onDragStart={onDragStart}
              onDelete={onDelete}
            />
          ))}
      </div>
    </div>
  );
};
