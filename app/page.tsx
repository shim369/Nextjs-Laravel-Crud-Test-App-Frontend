"use client";
import styles from "./page.module.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import React,{ useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import axios from "axios";

export default function Home() {
  const [task, setTask] = useState<Todo>({ id: 0, name: '', url: '', completed: false });
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [errors, setErrors] = useState<string[]>([]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const data = {
      name: task.name,
      url: task.url,
    }
  
    let errors: string[] = [];
  
    if (!task.name) {
      errors.push("Task name is required!")
    }
    if (!task.url) {
      errors.push("Task url is required!")
    }
    
    setErrors(errors);
  
    if (!errors.length) {
      try {
        let url = 'http://127.0.0.1:8000/api/save_task';
        const response = await axios.post(url, data);
        if (response.status == 200) {
          setTask({ id: 0, name: '', url: '', completed: false });
          alert(response.data.message);
        }
      } catch (error: any) {
        errors.push(error.response);
      }
    }
  }

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        let url = 'http://127.0.0.1:8000/api/tasks';
        const response = await axios.get(url);
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTasks();
  }, [tasks]);

  const deleteTask = async (id: Number) => {
    try {
      let url = `http://127.0.0.1:8000/api/delete_task/${id}`;
      const response = await axios.delete(url);
      if (response.data.code == 200) {
        alert(response.data.message);
        setTasks(tasks.filter((task) => task.id !== id));
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
          task={task}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          errors={errors}
        />
        <div className={styles.tasks}>
          {tasks.map((task) => {
            return (
              <TaskList
                key={task.id}
                task={task}
                onDeleteClick={deleteTask}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
