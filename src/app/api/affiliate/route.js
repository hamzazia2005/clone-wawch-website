import { NextResponse } from 'next/server';
import { serverAxios } from '@/utils/axios_clients';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('Affiliate API Route - Received body:', body);
    
    const response = await serverAxios.post('/api/affiliate-applications', body);
    
    console.log('Affiliate API Route - Strapi response:', response.data);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error submitting affiliate form:', error);
    
    // Handle axios error response
    if (error.response) {
      console.error('Strapi error status:', error.response.status);
      console.error('Strapi error data:', error.response.data);
      return NextResponse.json(
        { 
          message: 'Failed to submit affiliate form', 
          error: error.response.data?.message || error.message 
        },
        { status: error.response.status || 500 }
      );
    }
    
    // Handle network or other errors
    console.error('Network/Other error:', error.message);
    return NextResponse.json(
      { message: 'Failed to submit affiliate form', error: error.message },
      { status: 500 }
    );
  }
}