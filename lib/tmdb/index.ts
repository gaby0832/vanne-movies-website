import { basicFetch } from "./fetch";
import { fetchSearchMidias } from "./search";

export default {

    getHomeList: async () => {
        return [
            {
                slug: "originals",
                title: "Recomendados Para Você",
                items: await basicFetch("/trending/all/day?language=pt-BR", { cache: 1800 }),
                type: "all"
            },{
                slug: "horror",
                title: "Terror",
                items: await basicFetch("/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.descs&with_genres=27",
                { cache: 3600 }),
                type: "movie"
            },{
                slug: "thriller",
                title: "Thrillers",
                items: await basicFetch("/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.descs&with_genres=53",
                { cache: 3600 }),
                type: "movie"
            },{
                slug: "animation",
                title: "Animação",
                items: await basicFetch("/discover/tv?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.descs&with_genres=16",
                { cache: 3600 }),
                type: "tv"
            },       
        ]
    },

    getSingleDetails: async (id: string, type: string) => {
        return [
            {
                details: await basicFetch(`${type}/${id}?language=pt-BR`, { cache: 86400 }),
                recommendationList: [{
                    slug: "between",
                    title: "Semelhantes",
                    items: await basicFetch(`${type}/${id}/recommendations?language=pt-BR&page=1`, { cache: 21600 })
                }]
            }
        ]
    },

    getSearchList: async (query: string | null, type: string | null, page: number) => {
        return await fetchSearchMidias(query, type, page);
    }
}