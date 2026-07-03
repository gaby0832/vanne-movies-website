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

      const searchParams = await request.nextUrl.searchParams
      const id = searchParams.get('id') || null;
      const type = searchParams.get('type') || null;

      if(!id) return Response.json({error: "Nenhum ID de Midia encontrado"})
      if(!type) return Response.json({error: "Nenhum Tipo de Midia encontrado"})

      const response = await tmdb.getSingleDetails(id, type)
      return Response.json(response);
    
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export const runtime = "edge";