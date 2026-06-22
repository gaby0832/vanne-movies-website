"use client"
import Image from "next/image";
import { KeyObject } from "node:crypto";
import { useEffect, useState } from "react";
import MovieList from './components/movieList'

export default function Home() {


    const [movie, setMovie] = useState<Array<any>>([]);
  const handleRegister = async () => {

    try {

        const response: Response = await fetch(`/api/movieTranding`, {
          method: 'GET',
          headers: {
              accept: 'application/json',
          },
        });


      const data = await response.json();
      const movieCount:number = await  data.length;
      const randomInt:number = await Math.floor(Math.random() * (movieCount - 0 + 1)) + 0;   
      const randomMovie = await  data[randomInt]
      
      setMovie([randomMovie]);

    } catch (error) {
      console.error('Erro de registro:', error);
    } finally {
      console.log(movie)
    }
  };

    useEffect(()=>{
       handleRegister()
    },[])

  


  return (
    <div className="py-3 max-w-6xl my-0 mx-auto flex flex-col gap-4 text-white bg-[#080808] font-sans">
      {movie.length > 0 ?  
    <div className="my-5 w-full h-120 bg-black rounded-xl bg-center bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie[0].backdrop_path})`}}>
      <div className="w-full h-full bg-black/60 rounded-xl bg-center bg-cover flex flex-col gap-2 items-start justify-center px-10">
        <h1 className="text-6xl font-semibold">React</h1>
        <h1 className="text-7xl font-bold">{movie[0].title}</h1>
      <p className="font-light max-w-3xl">{movie[0].overview.length > 300 ? movie[0].overview.substring(0, 300)+"..." : movie[0].overview}</p>
      <div className="py-2 grid grid-cols-2 gap-4 w-full max-w-2xs">
        <button className="text-sm w-full h-full bg-[#03C210]/25 text-[#03C210] px-3 rounded-3xl outline-none decoration-[#4A4A4A] py-3 border-[0.2] border-[#03C210]">Hoje</button>
        <button className="text-sm w-full h-full bg-[#AE00FF]/25 text-[#AE00FF] px-3 rounded-3xl outline-none decoration-[#4A4A4A] py-3 border-[0.2] border-[#AE00FF]">Ver na Twitch</button>
      </div>
      </div>
      </div>
      :
      ""
      }
      
      <h1 className="text-xl font-semibold tracking-wide">Terror</h1>
      <MovieList genre="27" /> 
      <h1 className="text-xl font-semibold tracking-wide">Suspense</h1>
      <MovieList genre="53" />      
      <h1 className="text-xl font-semibold tracking-wide">Mistério</h1>
      <MovieList genre="9648" />
      <h1 className="text-xl font-semibold tracking-wide">Animação</h1>
      <MovieList genre="16" />
    </div>
  );
}
