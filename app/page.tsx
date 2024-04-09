"use client";
import styles from "./page.module.css";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

export default function Home() {
  return (
    <main>
      <h1 className={styles.title}>Next.js Laravel Todo App</h1>
      <section className={styles.tasksContainer}>
        <AddTask />
        <TaskList />
      </section>
    </main>
  );
}
