"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import tmdb from '../tmdb/tmdb'
import Image from 'next/image';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default function SearchPage() {


  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [page, setPage] = useState<number>(1)
  const [midias,setMidias] = useState<any>(null)

  useEffect(()=>{
    async function search(){
      const list = await tmdb.getSearchList(q, page);
      setMidias(list)
      console.log(list)
    }
    search()
  },[q])

  return (
    <div className='py-3 max-w-6xl my-0 mx-auto grid grid-cols-6 gap-4 text-white bg-[#080808] font-sans'>
        {midias?.results
          .filter((item: any) => item.poster_path !== null && item.poster_path !== undefined)
          .map((item: any) => (
            <div className="w-full py-5" key={item.id}>
              <Link href={`/${item.media_type}/${item.id}`}>
                <Image
                  loading="eager"
                  className="rounded-xl cursor-pointer scale-90 hover:scale-95 transition-transform"
                  width={350}
                  height={0}
                  src={`https://media.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt={item.title ?? item.name}
                />
              </Link>
            </div>
          ))}
    </div>
  );
}