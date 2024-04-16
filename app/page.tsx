"use client";
import styles from "./page.module.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        let url = 'http://127.0.0.1:8000/api/tasks';
        const response = await axios.get(url);
        setTodos(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTasks();
  }, [todos]);

  const deleteTask = async (id: Number) => {
    try {
      let url = `http://127.0.0.1:8000/api/delete_task/${id}`;
      const response = await axios.delete(url);
      if (response.data.code == 200) {
        alert(response.data.message);
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.log(error);
    };
  };


  return (
    <main>
      <h1 className={styles.title}>Next.js Laravel Todo App</h1>
      <section className={styles.tasksContainer}>
        <AddTask
        />
        <div className={styles.tasks}>
          {todos.map((todo) => {
            return (
              <TaskList
                key={todo.id}
                todo={todo}
                onDeleteClick={deleteTask}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
