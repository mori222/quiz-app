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
    // 学習時間を「時間」と「分」にフォーマットする関数
    const formatStudyTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} 時間 ${remainingMinutes} 分`;
    };

    // ドーナツグラフのデータ
    const data = {
        datasets: [
            {
                data: [studyData.totalProblems, 100 - studyData.totalProblems],
                backgroundColor: ['#57BBA0', '#DDDDDD'],
                hoverBackgroundColor: ['#57BBA0', '#DDDDDD'],
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
            // カスタムプラグインを使用して中央にテキストを表示
            afterDraw: (chart: any) => {
                const { ctx, chartArea: { width, height } } = chart;
                ctx.save();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = `${fontSize}em sans-serif`;
                ctx.textBaseline = 'middle';

                const text = `${studyData.studyDays}/100`;
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
                <p>学習した問題</p>
            </div>
            <div className={styles.chartContainer}>
                <Doughnut data={data} options={options} />
                <span className={styles.number}>{studyData.totalProblems}
                    <span className={styles.small}>/100</span>
                </span>
            </div>
            <ul className={styles.bottom}>
                <li>
                    <p>
                        学習日数<br />
                        <span>{studyData.studyDays}日</span>
                    </p>
                </li>
                <li>
                    <p>
                        学習時間<br />
                        <span>{formatStudyTime(studyData.studyMinutes)}</span>
                    </p>
                </li>
                <li>
                    <p>
                        正解数<br />
                        <span>{studyData.correctAnswers}問</span>
                    </p>
                </li>
                <li>
                    <p>
                        間違い数<br />
                        <span>{studyData.incorrectAnswers}問</span>
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default StudyData;
