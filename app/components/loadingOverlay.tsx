"use client"
import "../globals.css";
import Image from "next/image";

export default function Loading() {

  return (
    <div className="top-0 left-0 fixed w-full h-full z-50 py-2 my-0 mx-auto grid items-center justify-center font-sans bg-[#080808]">
      <div className="animate-heartbeat">
        <Image
        width={400}
        height={0}
        src="/logonav.png"
        alt="Vanne Filmes"
        loading="eager"
        />
      </div>  
    </div>
  );
}
