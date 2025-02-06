"use client"

import { useState, useEffect } from 'react';

export type StudyDataType = {
    totalProblems: number;
    correctAnswers: number;
    incorrectAnswers: number;
};

const useStudyData = (): [
    StudyDataType,
    (newData: Partial<StudyDataType>) => void
] => {
    const [studyData, setStudyData] = useState<StudyDataType>({
        totalProblems: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
    });

    // ローカルストレージからデータを読み込む
    useEffect(() => {
        const savedData = localStorage.getItem('studyData');
        if (savedData) {
            setStudyData(JSON.parse(savedData));
        } else {
            const today = new Date().toISOString().split('T')[0];
            setStudyData((prev) => ({ ...prev, lastStudyDate: today }));
        }
    }, []);

    // 学習データを更新する関数
    const updateStudyData = (newData: Partial<StudyDataType>) => {
        setStudyData((prev) => {
            const updatedData = { ...prev, ...newData };
            localStorage.setItem('studyData', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    return [studyData, updateStudyData];
};

export default useStudyData;
