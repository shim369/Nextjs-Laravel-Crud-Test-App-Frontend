"use client";
import styles from "./page.module.css";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <main>
      <h1>Next.js Laravel Todo App</h1>
      <section className={styles.tasksContainer}>
        <TaskList />
      </section>
    </main>
  );
}
