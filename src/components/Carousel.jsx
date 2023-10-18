// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from "swiper/modules";
import { Typography } from "@material-tailwind/react";
import NormalCard from "./cards/Card";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from "react";
const Carrusel = ({ valor }) => {
    const contentRef = useRef(null);

    console.log(valor);
   
    return (
        <div className="w-[100%] mx-auto">
            

        <div className='mt-24 flex justify-center'>
            
            <Swiper 
                effect={''}
                // onSlideChangeTransitionEnd={handleData}
                spaceBetween={0}
                grabCursor={true}
                centeredSlides={false}
                loop={true}
                slidesPerView={3}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
               
                className="swiper">
                {
                valor?.map((item, index) => (
                    <SwiperSlide key={index}
                        className='swiper-slide'>
                           <div className="flex justify-center items-center carousel-image"> 
                               
                                <div className="">
                                    <Link key={item.id} href={`/producto/${item.id}`}>
                                        <Image src={item.imagen} width={300} height={100} alt="imagen" 
                                        className="hover:scale-110 transition-transform duration-300 transform-gpu"/>
                                    </Link>
                                </div>
                                
                           </div>
                           {
                            item.categorie == "paquetes" ?<Typography color="blue-gray" className="w-full mt-5 font-large">
                            {item.name} </Typography> : <></>
                           }
                           
                      
                    </SwiperSlide>
                ))
            } </Swiper>


            <div className="yates" id='yates'></div>
        </div>
        </div>
    );

}

export default Carrusel;
