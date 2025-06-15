// app/api/process-call/route.ts
import { processCall } from '@/lib/actions/process.action';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { callId } = body;

    if (!callId) {
      return NextResponse.json({ error: 'Missing callId' }, { status: 400 });
    }

    const call = await processCall(callId);
    return NextResponse.json({ call });
  } catch (error: any) {
    console.error('Error processing call:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
