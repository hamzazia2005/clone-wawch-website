import { NextResponse } from 'next/server';
import { clientAxios } from '@/utils/axios_clients';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('GCLID API Route - Received body:', body);
    
    const response = await clientAxios.post('/api/gclid-applications', body);
    
    console.log('GCLID API Route - Strapi response:', response.data);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error submitting GCLID:', error);
    
    // Handle axios error response
    if (error.response) {
      console.error('Strapi error status:', error.response.status);
      console.error('Strapi error data:', error.response.data);
      return NextResponse.json(
        { 
          message: 'Failed to submit GCLID', 
          error: error.response.data?.message || error.message 
        },
        { status: error.response.status || 500 }
      );
    }
    
    // Handle network or other errors
    console.error('Network/Other error:', error.message);
    return NextResponse.json(
      { message: 'Failed to submit GCLID', error: error.message },
      { status: 500 }
    );
  }
}