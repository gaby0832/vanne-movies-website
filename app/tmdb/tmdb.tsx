const tmdbToken = process.env.NEXT_PUBLIC_TMDB_APIKEY;
const tmdbUrl = "https://api.themoviedb.org/3/";


const basicFetch = async (att: string) => {
    const response = await fetch(`${tmdbUrl}${att}`, {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbToken}`
        },
    })

    const {results} = await response.json()
    return results;
}

const movieFetch = async (id, type) => {
    const response = await fetch(`${tmdbUrl}${type}/${id}?language=pt-BR`, {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbToken}`
        },
    })

    const result = await response.json()
    return result;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: "originals",
                title: "Recomendados Para Você",
                items: await basicFetch("/trending/all/day?language=pt-BR"),
                type: "all"
            },{
                slug: "horror",
                title: "Terror",
                items: await basicFetch("/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.descs&with_genres=27"),
                type: "movie"
            },{
                slug: "thriller",
                title: "Thrillers",
                items: await basicFetch("/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.descs&with_genres=53"),
                type: "movie"
            },{
                slug: "animation",
                title: "Animação",
                items: await basicFetch("/discover/tv?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.descs&with_genres=16"),
                type: "tv"
            },       
        ]
    },
    getSingleMovie: async (id: string, type: string) => {
        return  await movieFetch(id, type);
    }
}