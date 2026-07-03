"use client"
import Loading from "@/app/components/loadingOverlay";
import { useEffect, useState } from "react";
import MovieList from "@/app/components/movieList";


export default function SingleMovie({
  params
}: {
  params: Promise<{ id: string }>
}) {


    const api_path = process.env.NEXT_PUBLIC_API_PATH;
    const [movie, setMovie] = useState<any>(null);
    const [listRecomandation, setListRecomendation] = useState<any>(null)
  

    useEffect(()=>{
      const handleRegister = async () => {

    try {

      const { id } = await params

      const response = await fetch(`${api_path}/api/midiaDetails?id=${id}&type=tv`);
      const results = await response.json();
      const { details, recommendationList } = await results[0];

      setMovie(details);
      setListRecomendation(recommendationList);

    } catch (error) {
      console.error('Erro de registro:', error);
    }
  };
       handleRegister()
    },[])

    
    useEffect(()=>{
      console.log(movie)
    },[movie])

    useEffect(()=>{
      console.log(listRecomandation)
    },[listRecomandation])
  
  
  if (!movie) return <Loading/>
  else
  return (
    <div className="sm:py-3 w-full max-w-6xl my-0 mx-auto flex flex-col gap-4 text-white bg-[#080808] font-sans">
      {movie ?  
    <div className="sm:my-5 my-0 w-full sm:h-130 h-auto bg-black sm:rounded-xl bg-center bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}`}}>
      <div className="sm:p-0 py-5 w-full h-full bg-black/60 sm:rounded-xl bg-center bg-cover flex flex-col gap-2 sm:items-start items-center justify-center sm:px-10 px-1">
        <h1 className="text-6xl font-semibold">Série</h1>
        <h1 className="text-7xl font-bold text-center p-2 sm:p-0 sm:text-left">{movie.name}</h1>
      <p className="font-light max-w-3xl text-center p-2 sm:p-0 sm:text-left">{movie.overview.length > 300 ? movie.overview.substring(0, 300)+"..." : movie.overview}</p>
      <div className="sm:px-0 px-5 py-2 sm:justify-center sm:items-start justify-center items-center flex flex-col">
        <p className="sm:px-0 px-5">{movie.number_of_seasons > 1 ? "Temporadas" : "Temporada"}</p>
        <div className="sm:px-0 px-5 py-2 justify-center items-center sm:justify-center sm:items-start grid grid-cols-20 gap-2">
            {Array.from({ length: movie.number_of_seasons }, (_, i) => (
                <button className="cursor-pointer w-10 h-10 flex justify-center items-center text-center rounded-4xl text-black bg-white" key={i}>
                {i + 1}
                </button>
            ))}
        </div>
      </div>
      <div className="py-2 grid grid-cols-1 gap-4 w-full max-w-2xs">
        <button className="cursor-pointer text-sm w-full h-full bg-[#03C210] text-[#004605] px-3 rounded-3xl outline-none decoration-[#4A4A4A] py-3 border-[0.2] border-[#03C210]">Pagar Reação</button>
      </div>
      </div>
      </div>
      :
      ""
      }


      {listRecomandation ? listRecomandation.map((index:any, key:number) =>(
                    <div className="w-full py-5" key={key}>
                      <h1 className="p-3 sm:p-0 font-semibold tracking-wide py-2">{index.title}</h1>
                       <MovieList items={index.items} type="tv" /> 
                    </div>
            )) : ""}

    </div>
  );
}
