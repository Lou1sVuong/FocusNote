import KanbanBoard from "@/components/common/kanban-board";
import React from "react";

export default function Home() {
  return (
    <>
      <main className="min-h-screen h-full flex items-center justify-center bg-gray-100 px-4">
        <KanbanBoard />
      </main>
    </>
  );
}
