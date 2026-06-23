"use client"
import '../globals.css'
import Image from "next/image";
import Link from "next/link";
import { KeyObject } from "node:crypto";
import React from "react";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react'

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
    className="absolute w-12 h-12 cursor-pointer text-center flex justify-center items-center bg-white text-black rounded-4xl left-0 top-1/2 z-10"
  >
    <ChevronLeft />
  </button>

  

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items ? items.map((index:any, key:number) =>(
            <div className="embla__slide" key={key} >
              <Link href={`${type !== "all"? type : index.media_type}/${index.id}`}>
                <Image loading="eager" className="rounded-xl cursor-pointer scale-90 hover:scale-95 transition-transform" alt={index.title} width={250} height={0} src={`https://media.themoviedb.org/t/p/w220_and_h330_face${index.poster_path}`} alt={index.title}/>
              </Link>
            </div>
          )) : ""}
        </div>
      </div>

          <button
    onClick={scrollNext}
    className="absolute w-12 h-12 text-center cursor-pointer flex justify-center items-center bg-white text-black right-[0] top-1/2 z-10 rounded-4xl"
  >
    <ChevronRight />
  </button>
    </div>
  );
}
