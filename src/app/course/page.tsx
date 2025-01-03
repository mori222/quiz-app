"use client"

import React from "react";
import Link from "next/link";
import { quizzes } from "@/utils/data";
import styles from "../../styles/css/course.module.css";

const Course: React.FC =() => {

    return (
        <ul className={styles.course}>
            {quizzes.map((quiz) => (
                <li key={quiz.id}>
                    <Link href={`/quiz/${quiz.id}`}>
                        <p>
                        {quiz.title}
                    </p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Course;