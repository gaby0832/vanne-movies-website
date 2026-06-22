"use client"
import Image from "next/image";
import Link from "next/link";
import { KeyObject } from "node:crypto";
import { useEffect, useState } from "react";

export default function MovieList({ genre }: {genre: string}) {


    const [movieList, setMovieList] = useState<any>({});
  const handleRegister = async () => {

    try {

        const response = await fetch(`/api/movieList?genre=${genre}`, {
          method: 'GET',
          headers: {
              accept: 'application/json',
          },
        });

      const data = await response.json();
      console.log(data)

      if (data) {
        setMovieList(data);
      } else {
        setMovieList(data)
      }
    } catch (error) {
      console.error('Erro de registro:', error);
    } finally {
      console.log(setMovieList)
    }
  };


  useEffect(()=>{
     handleRegister()
  },[])








  return (
    <div className="py-2 max-w-6xl my-0 mx-auto grid grid-cols-6 gap-8 items-center justify-center font-sans">
    {movieList.results ? movieList.results.map((index:any, key:number) =>(
        <div className="text-white flex items-center justify-center" key={key} >
          <Link href={`movie/${index.id}`}>
            <Image loading="eager" className="rounded-xl cursor-pointer hover:scale-105 transition-transform" alt={index.title} width={250} height={0} src={`https://media.themoviedb.org/t/p/w220_and_h330_face${index.poster_path}`} />
          </Link>
        </div>
      )) : ""}
    </div>
  );
}
