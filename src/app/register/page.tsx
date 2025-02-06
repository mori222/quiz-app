"use client"

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/css/login.module.css";
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            alert("パスワードが一致しません");
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password, nickname }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // 登録成功後にログインページにリダイレクト
                router.push('/login');
            } else {
                // エラーメッセージを表示
                setError(data.message || '登録に失敗しました');
            }
        } catch (err) {
            console.error('ネットワークエラーが発生しました', err);
            setError('ネットワークエラーが発生しました');
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
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="yourid"
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
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">登録</button>
            </form>
            <p>
                <Link href="/login">ログイン</Link>
            </p>
        </div>
    )
}

export default Register;