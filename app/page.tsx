"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Todo {
  id: number;
  name: string;
  url: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = 'http://127.0.0.1:8000/api/tasks';
      try {
        const response = await axios.get(url);
        setTodos(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h2>Task List</h2>
      <section className={styles.tasksContainer}>
        <div className={styles.tasks}>
          {todos.map((todo) => (
            <div className={styles.singleTask} key={todo.id}>
              <div className={styles.taskName}>
                <span className="check">
                  <FontAwesomeIcon icon={faCheck} color="#fff"/>
                </span>
                <h2>
                  <a href={todo.url} target="_blank">{todo.name}</a>
                </h2>
              </div>
              <div className={styles.taskLinks}>
                <button className={styles.editLink}>
                  <FontAwesomeIcon icon={faPenToSquare} color="#fff"/>
                </button>
                <button type="submit" className={styles.deleteBtn}>
                  <FontAwesomeIcon icon={faTrash} color="#fff"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
