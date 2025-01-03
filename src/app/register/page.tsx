"use client"

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/css/login.module.css";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("パスワードが一致しません");
            return;
        }
    };

    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formItem}>
                    <label htmlFor="nickname">ニックネーム</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="クイズ太郎"
                        required
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="quiz@example.com"
                        required
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="yourpassword"
                        required
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="confirmPassword">パスワードを再入力</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="yourpassword"
                        required
                    />
                </div>
                <button type="submit">登録</button>
            </form>
            <p>
                <Link href="/login">ログイン</Link>
            </p>
        </div>
    )
}

export default Register;