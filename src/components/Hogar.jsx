"use client"
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
export function FondoHogar() {
    return (
        <div className="w-full">
            <div className="flex relative"> 
                <Image src="/hogar/hogar.png" alt="Imagen" width={10000} height={0} className="absolute top-10 left-[18%] z-20 w-[50%]" /> {/* Utiliza clases para el posicionamiento */}
                <Image src="/hogar/hogar_02.png" alt="Imagen" width={10000} height={0} className="absolute top-0 left-[43%] z-10 w-[50%]" />

                <div className="bg-[#54c3eb] relative z-0 w-full h-[90vh] md:h-[90vh] sm:h-[60vh] h-[60vh]">

                </div>
                <div className="left-0 top-[50%] md:left-[10%] text-black absolute md:text-white sm:text-black z-10">
                    Mantén tu hogar siempre brillante y reluciente
                </div>
                <div className="absolute left-[10%] top-[60%] border border-white-400 text-white flex justify-center p-3 hover:bg-black transition duration-100">
                    <Link href={'/tienda'}>Comprar ahora</Link>
                </div>
                <div className="bg-white relative z-0 w-full">

                </div>
            </div>
        </div>
    );
}


