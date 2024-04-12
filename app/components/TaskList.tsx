import styles from "../page.module.css";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Todo } from "@/types/todo";

export default function TaskList(props: { todo: Todo; onDeleteClick: (id: number) => void }) {
    const handleDeleteClick = () => {
        props.onDeleteClick(props.todo.id);
    };

    return (
        <div className={styles.singleTask} key={props.todo.id}>
            <div className={styles.taskName}>
                    <span className={styles.check}>
                        {Number(props.todo.completed) === 1 && (
                        <FontAwesomeIcon icon={faCheck} />
                        )}
                    </span>
                <h2>
                    <Link href={props.todo.url} target="_blank">{props.todo.name}</Link>
                </h2>
            </div>
            <div className={styles.taskLinks}>
                <Link className={styles.editLink} href={`edit/${props.todo.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <button type="submit" onClick={handleDeleteClick} className={styles.deleteBtn}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}