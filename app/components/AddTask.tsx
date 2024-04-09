import { useState, ChangeEvent, FormEvent } from "react";
import styles from "../page.module.css";
import axios from 'axios';

interface Todo {
    name: string;
    url: string;
}

export default function AddTask() {
    const [task, setTask] = useState<Todo>({ name: '', url: '' });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let errors = [];
        if (!task.name) {
            errors.push("Task name is required!")
        }
        if (!task.url) {
            errors.push("Task url is required!")
        }
        if (!errors.length) {
            let formData = new FormData();
            formData.append('name', task.name);
            formData.append('url', task.url);
            let url = 'http://127.0.0.1:8000/api/save_task';
            await axios.post(url, formData).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    setTask({ name: '', url: '' });
                    alert(response.data.message);
                } else {
                    console.log('error');
                }
            }).catch(error => {
                errors.push(error.response);
            });
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form className={styles.taskForm} onSubmit={handleSubmit}>
            <div className={styles.addBox}>
                <input type="text" name="name" className={styles.taskInput} onChange={handleInputChange} placeholder="Add Task Name" autoComplete="off" />
                <input type="text" name="url" className={styles.taskInput} onChange={handleInputChange} placeholder="Add Task Url" autoComplete="off" />
                <div className={styles.formAlert}>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <button type="submit" className={styles.formSubmit}>Submit</button>
            </div>
        </form>
    );
}