import { useState, useEffect } from 'react';

export type StudyDataType = {
    totalProblems: number;     // 総問題数
    studyDays: number;         // 学習日数
    studyMinutes: number;      // 学習時間（分単位）
    correctAnswers: number;    // 正解数
    incorrectAnswers: number;  // 間違い数
    lastStudyDate: string;     // 最終学習日（YYYY-MM-DD）
};

const useStudyData = (): [
    StudyDataType,
    (newData: Partial<StudyDataType>) => void
] => {
    const [studyData, setStudyData] = useState<StudyDataType>({
        totalProblems: 0,
        studyDays: 0,
        studyMinutes: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        lastStudyDate: '',
    });

    // ローカルストレージからデータを読み込む
    useEffect(() => {
        const savedData = localStorage.getItem('studyData');
        if (savedData) {
            setStudyData(JSON.parse(savedData));
        } else {
            // 初回アクセス時に現在の日付を設定
            const today = new Date().toISOString().split('T')[0];
            setStudyData((prev) => ({ ...prev, lastStudyDate: today }));
        }
    }, []);

    // 最終学習日をチェックして日数を更新
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (studyData.lastStudyDate !== today) {
            updateStudyData({
                studyDays: studyData.studyDays + 1,
                lastStudyDate: today,
            });
        }
    }, [studyData]);

    // 学習データを更新する関数
    const updateStudyData = (newData: Partial<StudyDataType>) => {
        const updatedData = { ...studyData, ...newData };
        setStudyData(updatedData);
        localStorage.setItem('studyData', JSON.stringify(updatedData));
    };

    return [studyData, updateStudyData];
};

export default useStudyData; 