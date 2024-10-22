"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Column } from "@/components/common/column";
import { toast } from "sonner";

type Task = {
  id: string;
  content: string;
  status: "todo" | "inProgress" | "done";
};

type ColumnType = {
  id: "todo" | "inProgress" | "done";
  title: string;
};

const columns: ColumnType[] = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("kanbanTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now().toString(),
        content: newTask,
        status: "todo" as "todo" | "inProgress" | "done",
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
      toast(`Added Task Successfully`, {
        description: `${newTask} added`,
        action: {
          label: "Undo",
          onClick: () => undoAddTask(newTaskObj.id),
        },
      });
    }
  };

  const undoAddTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast(`Undo Add Task Successfully`, {});
  };

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (
    e: React.DragEvent,
    status: "todo" | "inProgress" | "done"
  ) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast(`Deleted Task Successfully`, {
        description: `${taskToDelete.content} deleted`,
      });
    }
  };

  return (
    <Card className="z-10 w-full xl:w-[60%] mx-auto bg-white shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-black">
          FocusNote
        </CardTitle>
        <p className="text-center text-gray-600 font-semibold">
          Total Tasks: {tasks.length}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow border-gray-300 text-black placeholder-gray-400"
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <Button
            onClick={addTask}
            className="bg-black text-white hover:bg-gray-800"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
