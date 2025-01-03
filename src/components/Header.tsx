"use client"

import React from 'react';
import styles from '../styles/css/header.modules.css';

const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
        <header className={styles.header}>
            <h1>{title}</h1>
        </header>
    )
}

export default Header;