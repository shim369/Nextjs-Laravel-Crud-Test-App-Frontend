import styles from "../page.module.css";
import { useEffect, useState } from "react";
import Link from 'next/link'
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

export default function TaskList() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const getAllTasks = async () => {
            let url = 'http://127.0.0.1:8000/api/tasks';
            try {
                const response = await axios.get(url);
                setTodos(response.data.tasks);
            } catch (error) {
                console.log(error);
            }
        };

        getAllTasks();
    }, []);

    return (
        <div className={styles.tasks}>
            {todos.map((todo) => (
                <div className={styles.singleTask} key={todo.id}>
                    <div className={styles.taskName}>
                        <span className={styles.check}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <h2>
                            <Link href={todo.url} target="_blank">{todo.name}</Link>
                        </h2>
                    </div>
                    <div className={styles.taskLinks}>
                        <button className={styles.editLink}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button type="submit" className={styles.deleteBtn}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

}