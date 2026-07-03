import { NextRequest, NextResponse } from 'next/server'
import tmdb from '@/lib/tmdb/index'
import { checkRateLimit } from '@/lib/middlewares/ratelimit';

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
      const q = searchParams.get('q') || null;
      const type = searchParams.get('type') || null;
      const page = Number(searchParams.get('page')) || null;


      if(!q) return Response.json({error: "Nenhuma Query encontrada"})
      if(!type) return Response.json({error: "Nenhum Tipo de Midia encontrado"})    
      if(!page) return Response.json({error: "Campo page não encontrado"})

      const response = await tmdb.getSearchList(q, type, page)
      return Response.json(response);
    
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

