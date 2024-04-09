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

    const deleteTask = async (id: Number) => {
        let url = `http://127.0.0.1:8000/api/delete_task/${id}`;
        try {
            const response = await axios.delete(url);
            if (response.data.code == 200) {
                alert(response.data.message);
            }
        } catch(error){
            console.log(error);
        };
    };

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
                        <Link className={styles.editLink} href={`edit/${todo.id}`}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button type="submit" onClick={() => deleteTask(todo.id)} className={styles.deleteBtn}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

}