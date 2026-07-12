"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MovieList({ items, type }: {items: any[], type: string}) {

  
  const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  align: "start",
  dragFree: true
  })
  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="embla relative">

  <button
    onClick={scrollPrev}
    className="absolute w-12 h-12 cursor-pointer text-center hidden md:flex justify-center items-center bg-white text-black rounded-4xl xl:left-[-12px] left-[0px] top-1/2 z-10"
    style={{top:"calc(50% - 12px)"}}
  >
    <ChevronLeft />
  </button>

  

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items ? items.map((index:any, key:number) =>(
            <div className="embla__slide" key={key} >
              <Link href={`/${type !== "all" || index.media_type === undefined? type : index.media_type}/${index.id}`}>
                <Image loading="eager" className="rounded-xl cursor-pointer scale-90 hover:scale-95 transition-transform" width={350} height={0} src={`https://media.themoviedb.org/t/p/w220_and_h330_face${index.poster_path}`} alt={index.title ? index.title : index.name}/>
              </Link>
            </div>
          )) : ""}
        </div>
      </div>

          <button
    onClick={scrollNext}
    className="absolute w-12 h-12 text-center cursor-pointer hidden md:flex justify-center content-center items-center bg-white text-black xl:right-[-12px] right-[0px] z-10 rounded-4xl"
    style={{top:"calc(50% - 12px)"}}
  >
    <ChevronRight />
  </button>
    </div>
  );
}
