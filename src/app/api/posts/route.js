import { BACKEND_URL } from '@/lib/Constants';
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(`${BACKEND_URL}/post`, {
    revalidate: 60,
  });
  const data = await res.json();

  return NextResponse.json(data);
}