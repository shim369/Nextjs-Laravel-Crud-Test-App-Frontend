import styles from "../page.module.css";
import { Todo } from "@/types/todo";

interface AddTaskProps {
    task: Todo,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errors: string[]
}

export default function AddTask({ task, handleSubmit, handleInputChange, errors }: AddTaskProps) {
    return (
        <form className={styles.taskForm} onSubmit={handleSubmit}>
            <div className={styles.addBox}>
                <label htmlFor="name"><span>TASK NAME</span>
                    <input type="text" id="name" name="name" className={styles.taskInput} value={task.name} onChange={handleInputChange} placeholder="Add Task Name" autoComplete="off" />
                </label>
                <label htmlFor="url"><span>TASK URL</span>
                    <input type="text" id="url" name="url" className={styles.taskInput} value={task.url} onChange={handleInputChange} placeholder="Add Task Url" autoComplete="off" />
                </label>
                <div className={styles.formAlert}>
                    <ul>
                        {errors.map((error: string, index: number) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className={styles.formSubmit}>Submit</button>
            </div>
        </form>
    );
}