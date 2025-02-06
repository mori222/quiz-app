"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from '../styles/css/footer.module.css';

const Footer: React.FC = () => {
    const pathname = usePathname();

    return (
        <footer className={styles.footer}>
            <ul>
                <li className={pathname === '/course' ? styles.active : ''}>
                    <Link href="/course">
                        <Image src="/images/icon_home.svg" alt="コース一覧" width={24} height={24} />
                        <p>コース一覧</p>
                    </Link>
                </li>
                <li className={pathname === '/progress' ? styles.active : ''}>
                    <Link href="/progress">
                        <Image src="/images/icon_data.svg" alt="学習データ" width={24} height={24} />
                        <p>学習データ</p>
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;