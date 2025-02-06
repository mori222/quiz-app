import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        return res.status(201).json({ message: '登録が成功しました' });
    } catch (error) {
        // error を使ってエラーメッセージを詳細に表示
        return res.status(500).json({ message: 'サーバーエラーが発生しました', error: (error as Error).message });
    }
}
