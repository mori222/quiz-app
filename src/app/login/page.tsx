"use client"

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/css/login.module.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return ( 
        <div className={styles.login}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formItem}>
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        type="email"
                        placeholder="quiz@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password" 
                        placeholder="yourpassword" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
            <p>
                <Link href="/register">新規登録</Link>
            </p>
        </div>
    )
}

export default Login;