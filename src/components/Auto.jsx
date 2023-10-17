"use client"

import Link from "next/link";
import Image from "next/image";

export function FondoAuto() {
    return (
        <div className="w-full">
            <div className="flex relative">
                <Image src="/autos/autos_02.png" alt="Imagen" width={10000} height={10000} className="absolute top-[5%] left-[30%] z-20 w-[50%]" />
                <Image src="/autos/autos_01.png" alt="Imagen" width={10000} height={10000} className="absolute top-[5%] left-[8%] z-10 w-[50%]" />
                <div className="bg-white relative z-0 w-full h-[60vh] md:h-[90vh] sm:h-[70vh]">

                </div>
                <div className="right-0 md:right-[10%] z-10 top-[50%] md:top-[40%] text-xl
                sm:top-[50%] text-gray-800 absolute md:text-white sm:text-black">
                    Refleja tu estilo con la limpieza impecable de tu auto.
                </div>
                <Link href={'/tienda'} className="absolute right-[10%] md:right-[26%] sm:right-[20%] z-10 top-[70%] md:top-[60%] sm:top-[60%] border border-white text-white flex justify-center p-3 hover:bg-black hover:border-none transition duration-100 cursor-pointer">Comprar ahora</Link>
                <div className="bg-[#ffc201] relative z-0 w-full">

                </div>
            </div>
        </div>
    );
}


