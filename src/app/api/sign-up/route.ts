import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const values = await request.json();
    
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "fail", error: "Something went wrong" },
      { status: 500 }
    );
  }
}
