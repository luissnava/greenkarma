"use client"
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
export function FondoPersonal() {
    return (
        <div className="w-full mb-32">
            <div className="flex relative"> {/* Agrega la clase 'relative' al contenedor */}
                <Image src="/personal/personal_01.png" width={10000} height={10000} alt="Imagen" className="absolute top-[10%] left-[40%] z-20 w-[50%]" />
                <Image src="/personal/personal_02.png" width={10000} height={10000} alt="Imagen" className="absolute top-[5%] left-[16%] z-10 w-[65%]" />

                <div className="bg-[#c49d71] relative z-0 w-full md:h-[90vh] sm:h-[60vh] h-[60vh]"> {/* Agrega 'relative' y establece un z-index menor */}

                </div>
                <div className="left-[10%] z-20 top-[55%] text-gray-800 text-xl absolute md:text-white sm:text-black">
                    Tu cuidado es nuestra prioridad.
                </div>
                <Link href={'/tienda'} className="absolute left-[10%] z-20 top-[75%] border border-white text-white flex justify-center p-3 hover:bg-black hover:border-none transition duration-100 cursor-pointer">Comprar ahora</Link>
                <div className="bg-white relative z-0 w-full">

                </div>
            </div>
        </div>
    );
}


