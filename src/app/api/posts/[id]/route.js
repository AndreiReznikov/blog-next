import { NextResponse } from 'next/server'
import { BACKEND_URL } from '@/lib/Constants';

export async function GET(request, { params }) {
  const res = await fetch(`${BACKEND_URL}/post/${params.id}`, { next: { revalidate: 60 } });

  const post = await res.json();

  return NextResponse.json({ post })
}