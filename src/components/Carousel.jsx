// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PaqueteCard from "./cards/PaqueteCard";
import NormalCard from "./cards/Card";
import { useRef } from "react";
const Carrusel = ({ valor }) => {
    const contentRef = useRef(null);

    const scrollLeft = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft -= 500;
        }
    };

    const scrollRight = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft += 500;
        }
    };

   
    return (
        <div className="w-[90%] mx-auto">
            <div className="mt-10 relative w-full">
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    size="2xl"
                    className="carousel-icon left-10"
                    onClick={scrollLeft}
                />
                <div ref={contentRef} className="carousel flex justify-center overflow-x-hidden scroll-smooth scrollbar-hide">
                    {
                        valor?.map(item => (
                            <div key={item.id} className="sm:space-x-2 md:p-4 lg:p-4 p-4">
                                <div key={item.id} className="sm:space-x-2 md:p-4 lg:p-4 p-4">
                                    {/* Renderizar PaqueteCard si valor es "paquetes", de lo contrario, renderizar NormalCard */}
                                    {item.categorie === "paquetes" ? (
                                        <PaqueteCard id={item.id} imageURL={item.imagen} categoria={item.categorie} name={item.name} price={item.price} description={item.description} />
                                    ) : (
                                        <NormalCard id={item.id} imageURL={item.imagen} name={item.name} price={item.price} description={item.description} />
                                    )}
                                </div>

                            </div>
                        ))
                    }
                </div>
                <FontAwesomeIcon
                    icon={faAngleRight}
                    size="2xl"
                    className="carousel-icon right-10"
                    onClick={scrollRight}
                />
            </div>
        </div>
    );

}

export default Carrusel;
