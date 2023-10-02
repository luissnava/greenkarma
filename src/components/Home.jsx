
"use client"
import Image from 'next/image'
import Link from 'next/link'
import Carrusel from '@/components/Carousel'
import { FondoRopa } from '@/components/Ropa'
import { FondoHogar } from '@/components/Hogar'
import { FondoCocina } from '@/components/Cocina'
import { FondoPersonal } from '@/components/Personal'
import { FondoAuto } from '@/components/Auto'
import { useEffect, useState } from 'react'
const handleBrowser = () =>{
    const browser = window.navigator.userAgent;
    console.log(browser);
}


const Home = () => {

    const [paquetes,setPaquetes] = useState(null)
    const [ropa,setRopa] = useState(null)
    const [hogar,setHogar] = useState(null)
    const [cocina,setCocina] = useState(null)
    const [autos,setAutos] = useState(null)
    const [personal,setPersonal] = useState(null)


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
                        status:item.status,
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

    useEffect(()=>{handleBrowser();getProductos()},[])

    return (
        <div className="w-full inline-block">
            <div className="mt-24 w-full h-screen">
            <div className="bg-fixed bg-cover bg-center h-full" style={{ backgroundImage: "url('/fondo_inicio.png')" }}>
                <div className="flex flex-col justify-center h-full p-4 md:p-14">
                <div className="text-3xl md:text-4xl sm:text-xl text-white text-center mb-4">
                    <span>¡Productos que cuidan el medio ambiente y tu casa!</span>
                </div>

                <div className="text-white text-lg md:text-2xl text-center mt-4">
                    <Link
                    href={'/tienda'}
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
                <Carrusel valor={hogar} />
            </div>
            </div>

            <div className=' w-full'>
            <div className="w-full">
            <FondoCocina></FondoCocina>
            </div>
            <div className="w-full">
            <Carrusel valor={cocina} />
            </div>
            </div>

            <div className=' w-full'>
                <div className="mt-5 mb-20"><FondoPersonal /></div>
                <div className="">
                    <Carrusel valor={personal} />
                </div>
            </div>

            <div className='w-full'>
            <FondoAuto />
            <Carrusel valor={autos} />
            </div>

            <div className='w-full h-[50vh]'>
            <div className="grid grid-cols-1 mx-auto flex justify-center items-center text-center p-10 w-full bg-fixed bg-cover bg-center h-full" style={{ backgroundImage: "url('/karma_fondo.png')" }}>
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
                <Image src={"/modo_karma/modo_01.png"} width={10000} height={10000} alt="Imagen" className='w-full' />
                </div>
                <div className="">
                <Image src={"/modo_karma/modo_02.png"} width={10000} height={10000} alt="Imagen" className='w-full' />
                </div>
            </div>
            </div>

            <div className='w-full text-center'>
            <div className="text-3xl mt-20 font-bold">Galeria de Clientes</div>
            <div className="grid grid-cols-6 mx-auto text-center mt-20  galeria">
                <Image src={"/clientes/limpia_pisos.jpg"} width={10000} height={10000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                
                <Image src={"/clientes/lavanderia.jpg"} width={10000} height={10000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                
                <Image src={"/clientes/ropa_limpia.jpg"} width={10000} height={10000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                
                <Image src={"/clientes/llantas.jpg"} width={10000} height={10000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                
                <Image src={"/clientes/ascensor_botones.jpg"} width={10000} height={10000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
                
                <Image src={"/clientes/persona_limpieza.jpg"} width={10000} height={10000} alt="Imagen" className='imagen h-full w-full hover:bg-black hover:border-none transition duration-100' />
            </div>
            </div>

            <div className='w-full h-[50vh]'>
                <div className="grid grid-cols-1 mx-auto flex justify-center items-center text-center p-5 w-full bg-fixed bg-cover bg-center h-full" style={{ backgroundImage: "url('/karma_fondo2.png')" }}>
                    <div className="text-white text-center text-5xl md:text-5xl sm:text-xl  mt-2">¡Gracias por comprometerte con nuestro planeta!</div>
                    <div className="text-white text-center text-4xl md:text-4xl sm:text-lg  mb-5">Te devolvemos $10MXN por cada botella Green Karma que regreses</div>
                </div>
            </div>

        </div>
    )
}

export default Home
