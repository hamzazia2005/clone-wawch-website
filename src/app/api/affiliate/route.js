import { NextResponse } from 'next/server';
import { clientAxios } from '@/utils/axios_clients';

export const runtime = "edge";

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await clientAxios.post('/api/affiliate-applications', body);    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error submitting affiliate form:', error);
    
    // Handle axios error response
    if (error.response) {
      return NextResponse.json(
        { 
          message: 'Failed to submit affiliate form', 
          error: error.response.data?.message || error.message 
        },
        { status: error.response.status || 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Failed to submit affiliate form', error: error.message },
      { status: 500 }
    );
  }
}