// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { facilityName, name, email, phone, facilityType, roomCount, currentOtas, concerns, message } = body;

    // バリデーション（必須項目チェック）
    if (!facilityName || !name || !email) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // SMTP設定（環境変数から読み込む）
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // メール送信
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'innbuddy.esg@gmail.com',
      subject: `【お問い合わせ】${facilityName} 様より`,
      text: `
        施設名: ${facilityName}
        ご担当者名: ${name}
        メールアドレス: ${email}
        電話番号: ${phone || '未入力'}
        施設の種類: ${facilityType || '未選択'}
        部屋数: ${roomCount || '未選択'}
        OTA: ${currentOtas?.join(', ') || 'なし'}
        相談内容: ${concerns?.join(', ') || 'なし'}
        詳細メッセージ:
        ${message || 'なし'}
      `,
    });

    return NextResponse.json(
      { message: '送信成功しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ メール送信エラー:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。しばらく経ってから再度お試しください。' },
      { status: 500 }
    );
  }
}
