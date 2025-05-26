import { NextResponse } from 'next/server';
import { clientAxios } from '@/utils/axios_clients';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await clientAxios.post('/api/contact-applications', body);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Handle axios error response
    if (error.response) {
      console.error('Strapi error:', error.response.data);
      return NextResponse.json(
        { 
          message: 'Failed to submit contact form', 
          error: error.response.data?.message || error.message 
        },
        { status: error.response.status || 500 }
      );
    }
    
    // Handle network or other errors
    return NextResponse.json(
      { message: 'Failed to submit contact form', error: error.message },
      { status: 500 }
    );
  }
}
