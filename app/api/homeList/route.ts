import { NextRequest, NextResponse } from 'next/server'
import tmdb from '@/lib/tmdb/index'
import { checkRateLimit }  from '@/lib/middlewares/ratelimit';


export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  const limit = 5;
  const interval = 60000; 

  const { success, remaining } = checkRateLimit(ip, limit, interval);

  if (!success) {
    return NextResponse.json(
      { message: "Too many requests, please try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  try {

    const response = await tmdb.getHomeList();
    return Response.json(response)

  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}