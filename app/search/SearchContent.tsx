"use client"

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import tmdb from '../tmdb/tmdb'
import Image from 'next/image';
import Link from 'next/link';
import Loading from "../components/loadingOverlay";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SearchPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") || 1;
  const type = searchParams.get("type") || "movie";

  const [midias,setMidias] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  

  const totalPages = midias?.total_pages || 1;

  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  const pages = [];

  for (
    let i = Math.max(1, endPage - 4);
    i <= endPage;
    i++
  ) {
    pages.push(i);
  }


  useEffect(()=>{
    async function search(){
      const list = await tmdb.getSearchList(type,q, page);
      if(list.error){
        setMidias(null)
        setErrorMessage(list.message)
      }else{
        setMidias(list)
      }
      console.log(list)
      console.log(page)
    }
    if(q) search()
  },[type,q,page])

  const changePage = (newPage: number) => {
    router.push(`/search?q=${q}&type=${type}&page=${newPage}`);
  };

    const changeType = (type: string) => {
    router.push(`/search?q=${q}&type=${type}&page=1`);
  };

  if(midias === null && errorMessage === null) return <Loading/>
  return (
    <div className='py-3 w-full max-w-6xl my-0 mx-auto flex flex-col gap-2 text-white font-sans'>
        
        {q && <h1 className="text-xl text-left">Pesquisa: {q} </h1>}
        
        {errorMessage ? 
        
        <h1 className="text-[#353535]">{errorMessage}</h1>
        
        :
        
        midias && <h1 className="text-[#353535]">{midias.total_results} resultados encontrados</h1>

        }

       <Select
  onValueChange={(value) => {
    changeType(value);
  }}
>
  <SelectTrigger className="my-4 w-full max-w-48">
    <SelectValue placeholder="Tipo de mídia" />
  </SelectTrigger>

  <SelectContent>
    <SelectGroup>
      <SelectItem value="movie">Filmes</SelectItem>
      <SelectItem value="tv">Séries</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

        <div className="max-w-6xl my-0 mx-auto grid grid-cols-6 gap-4 text-white font-sans">
        {midias?.results
          .filter((item: any) => item.poster_path !== null && item.poster_path !== undefined)
          .map((item: any) => (
            <div className="w-full py-5" key={item.id}>
              <Link href={`/${type === "movie" ? "movie" : "tv"}/${item.id}`}>
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



        <Pagination className="my-10">
           <PaginationContent>

            {Number(page) >= 5 ?
            
            <PaginationItem>
                <PaginationLink
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    changePage(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              
            
            : 
            
             ""
            
            } 

            {Number(page) >= 5 ? "..." : ""}
            
            {Number(totalPages) > 1 && pages.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href=""
                  isActive={pageNumber === page}
                  onClick={(e) => {
                    e.preventDefault();
                    changePage(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            
            {Number(page) !== totalPages && totalPages > 1 && Number(page) > 5 ? "..." : ""}

            {Number(page) !== totalPages && totalPages > 1 && Number(page) > 5  &&
            
               <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    changePage(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            
            } 

            
            </PaginationContent>
      </Pagination>

    </div>
  );
}