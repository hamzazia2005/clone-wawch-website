import { NextResponse } from 'next/server';

export const runtime = "edge";

export async function GET() {
  try {
    // Basic health check - Edge has no process.uptime()
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message 
      },
      { status: 500 }
    );
  }
}
