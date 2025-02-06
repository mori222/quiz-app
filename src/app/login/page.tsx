"use client"

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/css/login.module.css";

const Login: React.FC = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return ( 
        <div className={styles.login}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formItem}>
                    <label htmlFor="id">ID</label>
                    <input
                        type="id"
                        placeholder="yourid"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
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