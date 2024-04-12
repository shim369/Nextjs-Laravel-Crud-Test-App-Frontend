"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../page.module.css";
import axios from "axios";
import Link from "next/link";
import { Todo } from "@/types/todo";

type Props = {
    params: {
        id: number;
    }
}

export default function Page({ params }: Props) {
    const { id } = params;
    const [task, setTask] = useState<Todo>({ id: 0, name: '', url: '', completed: false });

    useEffect(() => {
        const getTaskById = async () => {
            let url = `http://127.0.0.1:8000/api/get_task/${id}`;
            try {
                const response = await axios.get(url);
                const taskData: Todo = response.data;
                taskData.completed = response.data.completed === 1;
                setTask(taskData);
            } catch (error) {
                console.log(error);
            }
        }

        getTaskById();
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const updateTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errors = [];
        if (!task.name) {
            errors.push("Task name is required!")
        }
        if (!errors.length) {
            let formData = new FormData();
            formData.append('name', task.name);
            formData.append('url', task.url);
            formData.append('completed', task.completed ? '1' : '0');
            let url = `http://127.0.0.1:8000/api/update_task/${id}`;
            try {
                const response = await axios.post(url, formData);
                if (response.status === 200) {
                    alert(response.data.message);
                } else {
                    console.log('error');
                }
            } catch (error: any) {
                errors.push(error.response);
            }
        }
    }

    return (
        <main>
            <h1 className={styles.title}>Edit Todo</h1>
            <section className={styles.tasksContainer}>
                <form className={styles.taskForm} onSubmit={updateTask}>
                    <div className={styles.addBox}>
                        <label>
                            <span>TASK ID</span>
                            <div>{task.id}</div>
                        </label>

                        <label htmlFor="name"><span>TASK NAME</span>
                            <input type="text" id="name" name="name" className={styles.taskInput} value={task.name} autoComplete="off" onChange={handleInputChange} />
                        </label>

                        <label htmlFor="url"><span>TASK URL</span>
                            <input type="text" id="url" name="url" className={styles.taskInput} value={task.url} autoComplete="off" onChange={handleInputChange} />
                        </label>
                        <label htmlFor="completed"><span>TASK Completed</span>
                            <input type="checkbox" id="completed" name="completed" checked={task.completed} onChange={handleCheckboxChange} />
                        </label>

                        <div className={styles.formAlert}>
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                        <button type="submit" className={styles.formSubmit}>Edit</button>
                    </div>
                </form>
                <Link href={'../'} className={styles.formSubmit}>Back to Top Page</Link>
            </section>
        </main>
    );
}