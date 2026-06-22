import { NextResponse } from "next/server";

export async function GET() {

    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=pt-BR`, {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_APIKEY}`
        },
    })


    const { results } = await response.json()
    return Response.json(results)
}
