import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_APIKEY}`
        },
    })

    const result = await response.json()
    return Response.json(result)
}
