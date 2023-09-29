"use client";
import {Card, Typography} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import "../../app/styles/efecto.css"

const PaqueteCard = ({
    id,
    imageURL,
    name,
    price,
    description
}) => {
    return (
        <div className="p-0 m-0 hover:scale-110
                    transition-transform duration-300 transform-gpu cursor-pointer"
            key={id}>

            <Link href={`/producto/${id}`}>
                <div className="image-container p-0 m-0 ">

                    <Image className="w-full"
                        src={imageURL}
                        width={10000}
                        height={10000}
                        alt="Imagen"/>
                    <Typography variant="h3" color="blue-gray" className="w-full mt-5 font-large">
                        {name} </Typography>
                </div>
            </Link>


        </div>
    );

}


export default PaqueteCard
