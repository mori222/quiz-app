"use client";

import React, { useState, useEffect } from 'react';
import { quizzes } from '@/utils/data';
import { useRouter, useParams } from 'next/navigation';
import styles from '@/styles/css/quiz.module.css';
import Link from 'next/link';
import useStudyData from '@/utils/useStudyData';
import Image from 'next/image';

const QuizPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const level = params.level;

    // quizLevelの取得
    const quizLevel = quizzes.find(quiz => quiz.id === Number(level));

    // フックをトップにまとめる
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
    const [incorrectQuestions, setIncorrectQuestions] = useState<{ question: string; correctAnswer: string; }[]>([]);

    const [studyData, updateStudyData] = useStudyData();

    // quizLevelがない場合は早期リターン
    if (!quizLevel) {
        return <div>クイズが見つかりません。</div>;
    }

    const currentQuestion = quizLevel.questions[currentQuestionIndex];

    const handleAnswer = (index: number, isCorrect: boolean) => {
        setSelectedOption(index);
        setCorrectOptionIndex(currentQuestion.options.findIndex(option => option === currentQuestion.answer));

        if (isCorrect) {
            setScore(score + 1);
            updateStudyData({
                totalProblems: studyData.totalProblems + 1,
                correctAnswers: studyData.correctAnswers + (isCorrect ? 1 : 0),
                incorrectAnswers: studyData.incorrectAnswers + (isCorrect ? 0 : 1),
            });
        } else {
            setIncorrectQuestions(prev => [
                ...prev,
                {
                    question: currentQuestion.question,
                    correctAnswer: currentQuestion.answer
                }
            ]);
        }

        setTimeout(() => {
            setSelectedOption(null);
            setCorrectOptionIndex(null);
            if (currentQuestionIndex < quizLevel.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                router.push(`/quiz/${level}/result?score=${score + (isCorrect ? 1 : 0)}&total=${quizLevel.questions.length}&incorrectQuestions=${JSON.stringify(incorrectQuestions)}`);
            }
        }, 1000);
    };

    // useEffect は条件付きではなくトップに配置
    useEffect(() => {
        // 必要に応じてuseEffectの処理をここに記述
    }, [currentQuestionIndex, score, incorrectQuestions, level, quizLevel?.questions.length]);

    return (
        <div className={styles.quiz}>
            <div className={styles.top}>
                <Link href="/course">
                    <figure><Image src="/images/icon_close.svg" alt="戻る" /></figure>
                </Link>
                <div className={styles.progress_bar}>
                    <p className={styles.number}><span className={styles.current_number}>{currentQuestionIndex + 1}</span> / {quizLevel.questions.length}</p>
                    <div className={styles.all_bar}><div className={styles.current_bar} style={{width: `${(currentQuestionIndex + 1) / quizLevel.questions.length * 100}%`}}></div></div>
                </div>
            </div>
            <h2 className={styles.question}>{currentQuestion.question}</h2>
            <ul className={styles.options}>
                {currentQuestion.options.map((option, index) => {
                    let optionClass = styles.option;
                    if (selectedOption !== null) {
                        optionClass += ` ${styles.selected}`;
                    }
                    if (selectedOption === index && option !== currentQuestion.answer) {
                        optionClass += ` ${styles.incorrect}`;
                    }
                    if (correctOptionIndex === index) {
                        optionClass += ` ${styles.correct}`;
                    }
                    return (
                        <li key={index} className={optionClass} onClick={() => handleAnswer(index, option === currentQuestion.answer)}>
                            <span className={styles.number}>{index + 1}</span>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuizPage;
