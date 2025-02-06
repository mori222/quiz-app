"use client"

import React from "react";
import Link from "next/link";
import styles from "@/styles/css/result.module.css";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
const ResultPage = () => {
    const searchParams = useSearchParams();
    const score = searchParams.get('score');
    const total = searchParams.get('total');
    const scoreNum = Number(score) || 0;
    const totalNum = Number(total) || 0;
    const incorrectQuestionsString = searchParams.get('incorrectQuestions');
    const incorrectQuestions = incorrectQuestionsString ? JSON.parse(incorrectQuestionsString as string) : [];

    let imageSrc;
    if (scoreNum >= 8 && scoreNum <= 10) {
        imageSrc = "/images/snake_01.png";
    } else if (scoreNum >= 4 && scoreNum <= 7) {
        imageSrc = "/images/snake_02.png";
    } else {
        imageSrc = "/images/snake_03.png";
    }

    console.log(incorrectQuestions);

    return (
        <div className={styles.result}>
            <div className={styles.illust_wrap}>
                <figure><Image src="/images/deco_paper.svg" alt="紙吹雪" width={100} height={100} /></figure>
                <picture>
                    <Image src={imageSrc} alt="結果イラスト" width={100} height={100} />
                </picture>
            </div>
            <div className={styles.correct_count}>
                <p className={styles.head}>正解数</p>
                <p className={styles.count}><span className={styles.correct_answer}>{scoreNum}</span> / {totalNum}</p>
            </div>
            <Link href="/course">
                <button className={styles.back_to_course}>コースに戻る</button>
            </Link>
            {incorrectQuestions.length > 0 && (
                <div className={styles.incorrect_quiz}>
                    <p className={styles.head}>間違えた問題</p>
                    <ul>
                        {incorrectQuestions.map((item: { question: string; correctAnswer: string; }, index: number) => (
                            <li key={index}>
                                <p className={styles.question}>{item.question}</p>
                                <p className={styles.answer}>{item.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ResultPage;