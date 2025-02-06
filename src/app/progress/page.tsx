"use client"

import React from 'react';
import StudyData from '@/components/StudyData';
import useStudyData from '@/utils/useStudyData';
import styles from '@/styles/css/progress.module.css';

const Mydata = () => {
    const [studyData, updateStudyData] = useStudyData();

    return (
        <div className={styles.progress}>
            <StudyData studyData={studyData} />
        </div>
    );
};

export default Mydata;