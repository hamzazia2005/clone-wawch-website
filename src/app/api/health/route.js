import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check - can be expanded with database/service checks
    return NextResponse.json(
      { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
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
