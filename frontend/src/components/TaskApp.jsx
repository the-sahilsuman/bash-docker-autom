import { useEffect, useState } from "react";
import API from "../api";
import React from "react";


export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // =====================
  // Load all tasks
  // =====================
  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // =====================
  // Add task
  // =====================
  const addTask = async () => {
    if (!title) return;

    await API.post("/tasks", { title, description });

    setTitle("");
    setDescription("");

    loadTasks();
  };

  // =====================
  // Delete task
  // =====================
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  // =====================
  // Toggle status
  // =====================
  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "done" : "pending",
    });

    loadTasks();
  };

  return (
    <div className="container">
      <h2>🚀 DevOps Task Manager</h2>

      {/* Form */}
      <div className="form">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="list">
        {tasks.map((task) => (
          <div key={task._id} className="task">
            <span>
              <b>{task.title}</b> — {task.description} ({task.status})
            </span>

            <div>
              <button onClick={() => toggleStatus(task)}>Toggle</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
