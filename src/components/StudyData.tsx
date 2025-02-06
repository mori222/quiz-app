"use client"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { StudyDataType } from '@/utils/useStudyData';
import styles from '@/styles/css/progress.module.css';

// Chart.js の必要なコンポーネントを登録
Chart.register(ArcElement, Tooltip, Legend);

type Props = {
    studyData: StudyDataType;
};

const StudyData: React.FC<Props> = ({ studyData }) => {
    // ドーナツグラフのデータ
    const data = {
        datasets: [
            {
                data: [studyData.correctAnswers, studyData.totalProblems - studyData.correctAnswers],
                backgroundColor: ['#57BBA0', '#DDDDDD'],
                borderWidth: 0,
            },
        ],
    };

    // ドーナツグラフのオプション
    const options = {
        cutout: '70%', // ドーナツの太さ
        plugins: {
            legend: {
                display: false, // 凡例を非表示
            },
            tooltip: {
                enabled: false, // ツールチップを非表示
            },
            afterDraw: (chart: Chart) => {
                const { ctx, chartArea: { width, height } } = chart;
                ctx.save();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = `${fontSize}em sans-serif`;
                ctx.textBaseline = 'middle';

                const text = `${studyData.correctAnswers}/${studyData.totalProblems}`;
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;

                ctx.fillStyle = '#000';
                ctx.fillText(text, textX, textY);
            },
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.progress_number}>
                <p>正解した問題</p>
            </div>
            <div className={styles.chartContainer}>
                <Doughnut data={data} options={options} />
                <span className={styles.number}>{studyData.correctAnswers}
                    <span className={styles.small}>/{studyData.totalProblems}</span>
                </span>
            </div>
            <ul className={styles.bottom}>
                <li>
                    <p>
                        正解した問題<br />
                        <span>{studyData.correctAnswers}問</span>
                    </p>
                </li>
                <li>
                    <p>
                        間違えた問題<br />
                        <span>{studyData.incorrectAnswers}問</span>
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default StudyData;
