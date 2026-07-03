const tmdbToken = process.env.TMDB_APIKEY;
const tmdbUrl = "https://api.themoviedb.org/3/";

export const fetchSearchMidias = async (query: string | null, type:string | null,  page: number) => {
    if(query){
    const response = await fetch(`${tmdbUrl}search/${type}?query=${query}&include_adult=false&language=pt-BR&page=${page}`, {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbToken}`
            },
        })

    const result = await response.json()
    if(result.results <= 0){
        return { message: 'Nenhum resultado encontrado', error: true }
    }else {
        return result;  
    }
    return result;  
    } else {
        return { error: 'Nenhuma query encontrada' }
    }
}