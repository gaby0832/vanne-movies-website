const tmdbToken = process.env.TMDB_APIKEY;
const tmdbUrl = "https://api.themoviedb.org/3/";

interface FetchOptions {
    cache?: number;
}

export const basicFetch = async (
    att: string,
    options?: FetchOptions
) => {
    const response = await fetch(`${tmdbUrl}${att}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbToken}`,
        },
        next: options?.cache
            ? {
                  revalidate: options.cache,
              }
            : undefined,
    });

    const responseJSON = await response.json();

    if (responseJSON.results) {
        return responseJSON.results;
    }

    return responseJSON;
};