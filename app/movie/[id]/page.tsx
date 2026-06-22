"use client"
import { useEffect, useState } from "react";

type PageProps = {
  params: Promise<{ id: string }>
}

export default function SingleMovie({ params }:PageProps) {

  
  
  const [movie, setMovie] = useState<Array<any>>([]);

  async function getMovieInfos(){
    
    const { id } = await params;

    try {

        const response = await fetch(`/api/movie?id=${id}`, {
          method: 'GET',
          headers: {
              accept: 'application/json',
          },
        });

      const data = await response.json();
      console.log(data)
      
      setMovie([data]);

    } catch (error) {
      console.error('Erro de registro:', error);
    } finally {
      console.log(movie)
    } 

  }

  
      useEffect(()=>{
         getMovieInfos()
      },[])
  

  return (
    <div className="py-3 w-full max-w-6xl my-0 mx-auto flex flex-col gap-4 text-white bg-[#080808] font-sans">
      {movie.length > 0 ?  
    <div className="my-5 w-full h-130 bg-black rounded-xl bg-center bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie[0].backdrop_path})`}}>
      <div className="w-full h-full bg-black/60 rounded-xl bg-center bg-cover flex flex-col gap-2 items-start justify-center px-10">
        <h1 className="text-6xl font-semibold">React</h1>
        <h1 className="text-7xl font-bold">{movie[0].title}</h1>
      <p className="font-light max-w-3xl">{movie[0].overview.length > 300 ? movie[0].overview.substring(0, 300)+"..." : movie[0].overview}</p>
      <div className="py-2 grid grid-cols-1 gap-4 w-full max-w-2xs">
        <button className="text-sm w-full h-full bg-[#03C210]/25 text-[#03C210] px-3 rounded-3xl outline-none decoration-[#4A4A4A] py-3 border-[0.2] border-[#03C210]">Pagar Reação R$20,00</button>
      </div>
      </div>
      </div>
      :
      ""
      }
    </div>
  );
}
