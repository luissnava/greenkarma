"use client";
import React from 'react'
import {Input, Button} from '@material-tailwind/react'
import Link from 'next/link'
const Footer = () => {
    return (
        <>
                
                <div className='w-full mt-10 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1'>

                    <div className="text-center">
                        <div className="text-xl">Siguenos en :</div>
                        <div className="flex justify-center items-center">
                            <div className="mt-8">
                                <a href="https://instagram.com/green_karma_mx?igshid=OGQ5ZDc2ODk2ZA==">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                                </a>

                            </div>
                            <div className="mt-8 ml-8">
                                <a href="https://www.facebook.com/greenkarmamx/">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                                </a>
                            </div>
                        </div>

                    </div>

                    <div className="text-center mt-4 sm:mt-4">
                        <div className="text-xl">¡Contáctanos para conocer más detalles!
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <div className="w-[50%]">
                                <Link className='bg-[#003c25] text-white p-3 rounded-lg'
                                    href={"https://wa.link/5t3ct7"}>Contáctanos</Link>
                            </div>
                        </div>

                    </div>
                    <div className="text-center mt-4 sm:mt-4">
                        <div className="text-xl">Contacto</div>
                        <div className="mt-6">+52 55 3800 3858  | info@greenkarma.com</div>

                    </div>
                </div>
                <div className="flex text-center justify-center items-center mt-5">
                    <Link href={"/politica"}>Politica de Privacidad</Link>
                </div>
            
        </>
    )
}

export default Footer