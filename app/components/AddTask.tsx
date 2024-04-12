import { useState, ChangeEvent, FormEvent } from "react";
import styles from "../page.module.css";
import axios from 'axios';
import { Todo } from "@/types/todo";

export default function AddTask() {
    const [task, setTask] = useState<Todo>({ id: 0, name: '', url: '', completed: false });

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
            try {
                const response = await axios.post(url, formData);
                // console.log(response);
                if (response.status == 200) {
                    alert(response.data.message);
                } else {
                    console.log('error');
                }
            } catch (error: any) {
                errors.push(error.response);
            }
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
                <label htmlFor="name"><span>TASK NAME</span>
                    <input type="text" id="name" name="name" className={styles.taskInput} onChange={handleInputChange} placeholder="Add Task Name" autoComplete="off" />
                </label>
                <label htmlFor="url"><span>TASK URL</span>
                    <input type="text" id="url" name="url" className={styles.taskInput} onChange={handleInputChange} placeholder="Add Task Url" autoComplete="off" />
                </label>
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