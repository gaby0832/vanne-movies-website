"use client"
import Loading from "@/app/components/loadingOverlay";
import { useEffect, useState } from "react";
import tmdb from '../../tmdb/tmdb'


export default function SingleMovie({
  params
}: {
  params: Promise<{ id: string }>
}) {

  
  
    const [movie, setMovie] = useState<any>(null);
  

    useEffect(()=>{
      const handleRegister = async () => {

    try {

      const { id } = await params
      const movie = await tmdb.getSingleMovie(id, "tv")
      setMovie(movie);

    } catch (error) {
      console.error('Erro de registro:', error);
    }
  };
       handleRegister()
    },[])

    
    useEffect(()=>{
      console.log(movie)
    },[movie])
  
  
  if (movie.length <= 0) return <Loading/>
  else
  return (
    <div className="py-3 w-full max-w-6xl my-0 mx-auto flex flex-col gap-4 text-white bg-[#080808] font-sans">
      {movie ?  
    <div className="my-5 w-full h-130 bg-black rounded-xl bg-center bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}`}}>
      <div className="w-full h-full bg-black/60 rounded-xl bg-center bg-cover flex flex-col gap-2 items-start justify-center px-10">
        <h1 className="text-6xl font-semibold">React</h1>
        <h1 className="text-7xl font-bold">{movie.name}</h1>
      <p className="font-light max-w-3xl">{movie.overview.length > 300 ? movie.overview.substring(0, 300)+"..." : movie.overview}</p>
      <div>
        <p>{movie.number_of_seasons > 1 ? "Temporadas" : "Temporada"}</p>
        <div className="py-2 grid grid-cols-20 gap-2 w-full">
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
    </div>
  );
}
