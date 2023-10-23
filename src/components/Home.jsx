"use client"; 
import Image from 'next/image'
import Link from 'next/link'
import Carrusel from '@/components/Carousel'
import {FondoRopa} from '@/components/Ropa'
import {FondoHogar} from '@/components/Hogar'
import {FondoCocina} from '@/components/Cocina'
import {FondoPersonal} from '@/components/Personal'
import {FondoAuto} from '@/components/Auto'
import {useEffect, useState} from 'react'

import { Carousel, Typography } from '@material-tailwind/react';


const Home = () => {

    const [paquetes, setPaquetes] = useState(null)
    const [ropa, setRopa] = useState(null)
    const [hogar, setHogar] = useState(null)
    const [cocina, setCocina] = useState(null)
    const [autos, setAutos] = useState(null)
    const [personal, setPersonal] = useState(null)
    const [browser, setBrowser] = useState(null)

    const handleBrowser = () => {
        const browser = window.navigator.userAgent;
        // console.log(browser);
        if (browser.includes("Mac")) {
            setBrowser("Mac")
            // console.log("Mac OS");
        }
    }

    const getProductos = async () => {
        const lista = []
        const response = await fetch("/api/getProductos", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response) {
            if (response.ok == true && response.status == 200) {
                const data = await response.json()
                if (data) {
                    const productos = data.productos.map(item => ({
                        id: item.id,
                        status: item.status,
                        categorie: item.categorie,
                        name: item.name,
                        price: item.price,
                        prices: item.prices,
                        suscriptions: item.suscriptions,
                        imagen: item.imagen,
                        imagenes: item.imagenes,
                        litros: item.litros,
                        incluye: item.incluye,
                        date_created: item.createdAt,
                        date_updated: item.updateAt
                    }))
                    const paquetes = productos.filter((item) => item.categorie == "paquetes")
                    const ropa = productos.filter((item) => item.categorie == "ropa")
                    const hogar = productos.filter((item) => item.categorie == "hogar")
                    const autos = productos.filter((item) => item.categorie == "autos")
                    const cocina = productos.filter((item) => item.categorie == "cocina")
                    const personal = productos.filter((item) => item.categorie == "personal")
                    setPaquetes(paquetes)
                    setRopa(ropa)
                    setHogar(hogar)
                    setAutos(autos)
                    setCocina(cocina)
                    setPersonal(personal)
                }

            } else {
                console.log("Error del Servidor");
            }
        }
    }

    useEffect(() => {
        handleBrowser();
        getProductos()
    }, [])

    return (
        <div className="w-full inline-block">
            <div className="mt-24 w-full h-screen">
                <div className={
                        `${
                            browser == "Mac" ? '' : 'bg-fixed'
                        } bg-cover bg-center h-full`
                    }
                    style={
                        {
                            backgroundImage: "url('/fondo_inicio.png')"
                        }
                }>
                    <div className="flex flex-col justify-center h-full p-4 md:p-14">
                        <div className="text-3xl md:text-4xl sm:text-xl text-white text-center mb-4">
                            <span>¡Productos que cuidan el medio ambiente y tu casa!</span>
                        </div>

                        <div className="text-white text-lg md:text-2xl text-center mt-4">
                            <Link href={'/tienda'}
                                className="mt-4 md:mt-10 bg-[#7bbd62] w-[80%] md:w-[30%] p-3 md:p-4 shadow-md rounded text-white mx-auto hover:bg-black hover:border-none transition duration-100 cursor-pointer">
                                ¡Hacer Pedido!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-24 w-full text-center'>
                <div className="w-full h-10 mt-20 flex justify-center text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl">¡Equipa tu casa con nuestros kits!</div>

                </div>
                <div className="w-full flex justify-center mt-10 text-center">
                    <div className="text-2xl sm:text-3xl md:text-3xl">Libera tu mente, pide nuestros paquetes completos con tu periodicidad</div>
                </div>

                <div className="w-full  p-10">
                    <Carrusel valor={paquetes}></Carrusel>
                </div>
            </div>

            <div className=' w-full'>
                <div className='w-full'>
                    <FondoRopa></FondoRopa>
                </div>
                <div className="w-full ">
                    <Carrusel valor={ropa}></Carrusel>
                </div>
            </div>

            <div className=' w-full'>
                <div className="w-full">
                    <FondoHogar></FondoHogar>
                </div>
                <div className="w-full">
                    <Carrusel valor={hogar}/>
                </div>
            </div>

            <div className=' w-full'>
                <div className="w-full">
                    <FondoCocina></FondoCocina>
                </div>
                <div className="w-full">
                    <Carrusel valor={cocina}/>
                </div>
            </div>

            <div className=' w-full'>
                <div className="mt-5 mb-20"><FondoPersonal/></div>
                <div className="">
                    <Carrusel valor={personal}/>
                </div>
            </div>

            <div className='w-full'>
                <FondoAuto/>
                <Carrusel valor={autos}/>
            </div>

            <div className='w-full h-[50vh]'>
                <div className={
                        `grid grid-cols-1 mx-auto flex justify-center items-center text-center p-10 w-full ${
                            browser == "Mac" ? '' : 'bg-fixed'
                        } bg-cover 
            bg-center h-full`
                    }
                    style={
                        {
                            backgroundImage: "url('/karma_fondo.png')"
                        }
                }>
                    <div className="text-white text-2xl sm:text-2xl md:text-5xl">Libera tu mente de comprar productos de limpieza</div>
                    <div className="text-white text-2xl sm:text-2xl md:text-5xl mt-2">Escoge tu periodicidad de entrega</div>
                    <Link href={'/tienda'}
                        className="w-[40%] md:w-[10%] sm:w-[30%] py-2 mx-auto border border-white text-white
                                            mt-6 flex justify-center p-0 hover:bg-black hover:border-none transition duration-100 cursor-pointer">Comprar ahora</Link>
                </div>
            </div>

            <div className='w-full'>
                <div className="mx-auto text-center mt-20">
                    <div className="text-3xl font-bold">Modo Green Karma</div>
                    <div className="">
                        <Image src={"/modo_karma/modo_01.png"}
                            width={1000}
                            height={1000}
                            alt="Imagen"
                            className='w-full'/>
                    </div>
                    <div className="">
                        <Image src={"/modo_karma/modo_02.png"}
                            width={1000}
                            height={1000}
                            alt="Imagen"
                            className='w-full'/>
                    </div>
                </div>
            </div>

            <div className='w-full text-center'>
                <div className="text-3xl mt-10 font-bold">Galeria de Clientes</div>
                <div className="mt-10">

                    <Carousel className="h-[100vh] w-full"
                        navigation={
                            ({setActiveIndex, activeIndex, length}) => (
                                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                    {
                                    new Array(length).fill("").map((_, i) => (
                                        <span key={i}
                                            className={
                                                `block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                                }`
                                            }
                                            onClick={
                                                () => setActiveIndex(i)
                                            }/>
                                    ))
                                } </div>
                            )
                        }
                        transition={
                            {
                                type: "tween",
                                duration: 1
                            }
                        }
                        // autoplayDelay={5000}
                        // autoplay={true}
                        loop={true}>
                        <div className="h-full w-full">
                            <Image src={"/clientes/limpia_pisos.jpg"} width={1000} height={1000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                          
                        </div>
                        <div className="h-full w-full">

                            <Image src={"/clientes/lavanderia.jpg"} width={1000} height={1000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />

                        </div>
                        <div className="h-full w-full">
                        <Image src={"/clientes/ropa_limpia.jpg"} width={1000} height={1000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />

                        </div>
                        <div className="h-full w-full">
                            <Image src={"/clientes/llantas.jpg"} width={1000} height={1000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />

                        </div>
                        <div className="h-full w-full">
                            <Image src={"/clientes/ascensor_botones.jpg"} width={1000} height={1000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                        </div>
                        <div className="w-full h-full">
                            <Image src={"/clientes/persona_limpieza.jpg"} width={10000} height={10000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                        </div>
                    </Carousel>
                </div>
            </div>

            <div className='w-full h-[50vh]'>
                <div className={
                        `grid grid-cols-1 mx-auto flex justify-center items-center text-center p-5 w-full ${
                            browser == "Mac" ? '' : 'bg-fixed'
                        } bg-cover 
                bg-center h-full`
                    }
                    style={
                        {
                            backgroundImage: "url('/karma_fondo2.png')"
                        }
                }>
                    <div className="text-white text-center text-2xl md:text-5xl sm:text-xl  mt-2">¡Gracias por comprometerte con nuestro planeta!</div>
                    <div className="text-white text-center text-2xl md:text-4xl sm:text-lg  mb-5">Te devolvemos $10MXN por cada botella Green Karma que regreses</div>
                </div>
            </div>

        </div>
    )
}

export default Home
