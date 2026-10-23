// app/api/download/route.ts
import { NextResponse } from 'next/server';

// ご自身の Web app URL を貼り付けてください
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyMNn86bxj4qG9zt-a-oSzy650rLfsP3HBZiU7WYAJ78TYDzMu3QL_kzVRImAD9E6iR/exec';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // GASへ全項目を転送
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        diagnosticType: 'download',
        downloadType: body.downloadType, // 'halal' または 'inbound'
        facilityName: body.facilityName || body.company,
        contactName: body.contactName || body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        ratio: body.ratio,
        nationalities: body.nationalities,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Download registration error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}