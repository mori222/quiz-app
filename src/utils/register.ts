import type { NextApiRequest, NextApiResponse } from 'next';

interface RegisterRequest {
    id: string;
    password: string;
    nickname: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id, password, nickname } = req.body as RegisterRequest;

    try {
        return res.status(201).json({ message: '登録が成功しました' });
    } catch (error) {
        return res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
} 