import styles from "../page.module.css";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Todo } from "@/types/todo";

interface TaskListProps {
    task: Todo,
    onDeleteClick: (id: number) => void
}

export default function TaskList({ task, onDeleteClick }: TaskListProps) {
    const handleDeleteClick = () => {
        onDeleteClick(task.id);
    };

    return (
        <div className={styles.singleTask} key={task.id}>
            <div className={styles.taskName}>
                    <span className={styles.check}>
                        {Number(task.completed) === 1 && (
                        <FontAwesomeIcon icon={faCheck} />
                        )}
                    </span>
                <h2>
                    <Link href={task.url} target="_blank">{task.name}</Link>
                </h2>
            </div>
            <div className={styles.taskLinks}>
                <Link className={styles.editLink} href={`edit/${task.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <button type="submit" onClick={handleDeleteClick} className={styles.deleteBtn}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}