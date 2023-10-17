"use client"
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

export function FondoCocina() {
    return (
        <div className="w-full">
            <div className="flex relative"> {/* Agrega la clase 'relative' al contenedor */}
                <Image src="/cocina/cocina_letra.png" alt="Imagen" width={10000} height={10000} 
                className="absolute top-[10%] left-[32%] z-20 w-[50%]" /> {/* Utiliza clases para el posicionamiento */}
                <Image src="/cocina/cocina_02.png" alt="Imagen" width={10000} height={10000} 
                className="absolute top-10% left-[5%] z-10 w-[50%]" />

                <div className="bg-white relative z-0 w-full md:h-[90vh] sm:h-[60vh] h-[60vh]"> {/* Agrega 'relative' y establece un z-index menor */}

                </div>
                <div className="right-0 z-10 top-[50%] text-gray-800 text-lg text-right p-4
                 md:text-white lg:text-white sm:text-black absolute">
                    No batalles con la grasa de tus trastes y utencilios de cocina.
                </div>
                <Link href={'/tienda'} className="mt-8 absolute right-[10%] md:right-[27%] sm:right-[20%] z-10 top-[70%] border border-white text-white flex justify-center p-3 hover:bg-black hover:border-none transition duration-100 cursor-pointer">Comprar ahora</Link>
                <div className="bg-[#f67721] relative z-0 w-full">
                </div>
            </div>
        </div>
    );
}


