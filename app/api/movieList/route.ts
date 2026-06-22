import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const genre = searchParams.get('genre')

    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${genre}`, {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_APIKEY}`
        },
    })

    const result = await response.json()
    return Response.json(result)
}
