import { NextResponse } from 'next/server';
import { clientAxios } from '@/utils/axios_clients';

export async function POST(request) {
  try {
    const body = await request.json();    
    const response = await clientAxios.post('/api/gclid-applications', body);
    return NextResponse.json(response.data);
  } catch (error) {
    
    // Handle axios error response
    if (error.response) {
      return NextResponse.json(
        { 
          message: 'Failed to submit GCLID', 
          error: error.response.data?.message || error.message 
        },
        { status: error.response.status || 500 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to submit GCLID', error: error.message },
      { status: 500 }
    );
  }
}