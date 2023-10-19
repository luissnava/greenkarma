"use client";
import React , {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@material-tailwind/react'
const About = () => {
  const [browser,setBrowser] = useState(null)

    const handleBrowser = () =>{
        const browser = window.navigator.userAgent;
        console.log(browser);
        if (browser.includes("Safari")) {
            setBrowser("Safari")
            console.log("Safari");
        }else{
          setBrowser(null)
        }
    }
    useEffect(()=>{handleBrowser},[])
    return (
        <>
            <div className="relative h-screen">
              <div className={`absolute inset-0 ${browser == "Safari" ? '': 'bg-fixed'} bg-cover bg-center`} style={{backgroundImage: "url('fondo_about.png')"}}>
                
                <div className="relative flex items-center justify-center h-full text-white text-4xl font-bold">
                    ¿QUIÉNES SOMOS?
                </div>
              </div>

              <div className="flex items-center justify-center h-full realtive text-white text-2xl">
                  <Link href={"/tienda"} className='mt-48 bg-[#7bbd62] p-4 shadow-bottom rounded shadow-md hover:bg-black hover:border-white-500 transition duration-100 cursor-pointer'>¡Hacer Pedido!</Link>
              </div>
            </div>
            <div className="mt-20 h-full w-full text-center">

                {/* <div className="mx-auto inline-block">
                    <Image src={"/creadora.webp"} width={300} height={300} alt='imagen' style={{borderRadius:"50%"}}/>
                </div> */}

                <Typography variant='h3'>Karen Miranda</Typography>
                <Typography variant='h5' className='font-weight'>Creadora</Typography>

                <div className="mt-10 text-left px-[15%] space-y-10">
                  
                  <Typography  className='font-normal text-2xl'>
                      Soy Karen una ama de casa cansada de desechar botellas de productos de limpieza de un solo uso, que están matando nuestro entorno. Por ello cree el sistema Green Karma, encargado de reutilizar botellas de productos de limpieza con calidad superior a lo que encuentras en el supermercado.
                      
                  </Typography>
                  <Typography className='text-2xl'>
                    Le pedí ayuda a mis hijos para crear este proyecto y compartir con ustedes la pasión por cuidar nuestro planeta.
                  </Typography>
                    
                </div>
                <div className="flex justify-end inline-block -mt-60 sm:mt-32 md:-mt-28 ">
                      <Image src={"/hojas.png"} width={100} height={100} alt='imagen'/>
                </div>
                
            </div>

            <div className="mt-40 sm:mt-20 md:mt-28 lg:mt-32 border-green-500 text-center">
              <div className="flex justify-center">
                {/* <Image src={"/hojas.png"} width={90} height={90} alt='Imagen'></Image> */}
                <Typography variant='h1' className='font-bold mt-4'>
                    Modo Green Karma
                </Typography>
              </div>
              <div className="mx-auto inline-block mt-10">
                <Image src={"/ciclo.png"} width={1000} height={1000} alt='imagen'/>
              </div>
            </div>


            <div className="px-2 sm:px-0 md:px-[15%] text-center">
              <Typography variant='h1' className='font-bold'>
                ¿Por qué es mejor reutilizar que solo reciclar?
              </Typography>
              <div className="space-y-10 space-x-5 flex items-center mt-4 p-0">
                <Image src={"/hojas.png"} width={90} height={90} alt='imagen' className='mt-10'></Image>
                
                <Typography className='text-3xl text-left'>
                  La reutilización extiende la vida útil de los productos, reduciendo la necesidad de fabricar nuevos 
                </Typography>
              </div>
              <div className="space-y-10 space-x-5 flex items-center mt-4 p-0">
                <Image src={"/hojas.png"} width={90} height={90} alt='imagen' className='mt-10'></Image>
                
                <Typography className='text-3xl text-left'>
                  Disminuye el consumo de recursos naturales en un 99%, según un estudio de Environmental Science & Technology.
                </Typography>
              </div>
              <div className="space-y-10 space-x-5 flex items-center mt-4 p-0">
                <Image src={"/hojas.png"} width={90} height={90} alt='imagen' className='mt-10'></Image>
                
                <Typography className='text-3xl text-left'>
                Ahorro de energía, a diferencia de solamente reciclar productos de un solo uso,
                ya que no requiere la transformación de materiales recolectados. 
                </Typography>
              </div>
              <div className="space-y-10 space-x-5 flex items-center mt-4 p-0">
                <Image src={"/hojas.png"} width={90} height={90} alt='imagen' className='mt-10'></Image>
                
                <Typography className='text-3xl text-left'>
                Impulsa la economía circular al mantener los productos y materiales en uso durante más tiempo, creando más empleos.
                </Typography>
              </div>
              <div className="space-y-10 space-x-5 flex items-center mt-4 p-0">
                <Image src={"/hojas.png"} width={90} height={90} alt='imagen' className='mt-10'></Image>
                
                <Typography className='text-3xl text-left'>
                Mejora de la eficiencia de recursos, reutilizando productos se maximiza su valor y se evita la pérdida de recursos incorporados en ellos.
                </Typography>
              </div>
            </div>
        </>

    )
}

export default About
