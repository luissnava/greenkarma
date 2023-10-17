"use client"
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
export function FondoRopa() {
  return (
    <div className="w-full">
      <div className="flex relative">
        <Image src="/ropa/ropa_02.png" width={10000} height={0} alt="Imagen" className="absolute top-[5%] left-[32%] z-20 w-[50%]" />
        <Image src="/ropa/ropa_01.png" width={10000} height={0} alt="Imagen" className="absolute top-[3%] left-[5%] z-10 w-[50%]" />

        <div className="bg-white relative z-0 w-full md:h-[90vh] sm:h-[60vh] h-[60vh]">

        </div>
        <div className="p-4 text-xl tex-gray-800 sm:text-gray-800 sm:text-lg md:text-white lg:text-whiter right-0 
        md:right-[3%] z-10 top-[50%] absolute">
          Productos para el correcto lavado  y cuidado de todas tus prendas
          
        </div>
        <Link href={'/tienda'} 
        className="absolute right-[12%] sm:right-[20%] sm:text-white md:text-white  md:right-[30%] z-10 top-[75%] md:top-[65%] 
        border border-white flex justify-center p-3 hover:bg-black hover:border-none transition duration-100 cursor-pointer text-white">Comprar ahora</Link>
        <div className="bg-[#a386db] relative z-0 w-full">

        </div>
      </div>
    </div>
  );
}