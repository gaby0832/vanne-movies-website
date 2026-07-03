"use client"
import { useEffect, useState } from "react";
import MovieList from './components/movieList'
import Loading from "./components/loadingOverlay";
export default function Home() {


    const api_path = process.env.NEXT_PUBLIC_API_PATH;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [moviesDay, setMoviesDay] = useState<any>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [movies, setMovies] = useState<Array<any>>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [media, setMedia] = useState<any>(null);
  

    useEffect(()=>{
      const handleRegister = async () => {

    try {

      const response = await fetch(`${api_path}/api/homeList`);
      const Homelist = await response.json()

      const movieCount:number = await Homelist[0].items.length;
      const randomInt:number = await Math.floor(Math.random() * (movieCount - 0 + 1)) + 0;   
      const randomMovie = await Homelist[0].items[randomInt]; 
      
      setMovies(Homelist);
      setMedia(!moviesDay ? randomMovie : moviesDay);

    } catch (error) {
      console.error('Erro de registro:', error);
    } finally {
      
    }
  };
       handleRegister()
    },[])


  

  if (movies.length <= 0) return <Loading/>
  else
  return (
    <div className="sm:py-3 max-w-6xl my-0 mx-auto flex flex-col gap-4 text-white bg-[#080808] font-sans">
      {media ?  
    <div className="sm:my-5 my-0 w-full h-120 bg-black sm:rounded-xl bg-center bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`}}>
      <div className="w-full h-full bg-black/60 sm:rounded-xl bg-center bg-cover flex flex-col gap-2 sm:items-start items-center justify-center sm:px-10">
      <h1 className="text-3xl sm:text-6xl font-semibold">{!moviesDay ? "Recomendação" : "React"}</h1>
        <h1 className="text-7xl font-bold text-center p-2 sm:p-0 sm:text-left">{media.title ? media.title : media.name}</h1>
      <p className="font-light max-w-3xl w-full px-3 sm:p-0 sm:text-left text-center">{media.overview.length > 300 ? media.overview.substring(0, 300)+"..." : media.overview}</p>
      <div className="py-2 grid grid-cols-2 gap-4 w-full max-w-2xs">
        {moviesDay ?  <button className="text-sm w-full h-full bg-[#03C210]/25 text-[#03C210] px-3 rounded-3xl outline-none decoration-[#4A4A4A] py-3 border-[0.2] border-[#03C210]">Hoje</button> : ""}
        {moviesDay ? <button className="text-sm w-full h-full bg-[#AE00FF]/25 text-[#AE00FF] px-3 rounded-3xl outline-none decoration-[#4A4A4A] py-3 border-[0.2] border-[#AE00FF]">Ver na Twitch</button> : ""}
      </div>
      </div>
      </div>
      :
      ""
      }

      {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any  
      movies ? movies.map((index:any, key:number) =>(
        <div className="w-full py-5" key={key}>
          <h1 className="px-3 sm:p-0 text-xl font-semibold tracking-wide py-2">{index.title}</h1>
           <MovieList items={index.items} type={index.type} /> 
        </div>
      )) : ""}
      
    </div>
  );
}
