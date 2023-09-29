
"use client"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import "../../app/styles/efecto.css"
import Link from "next/link";

const NormalCard = ({ id, imageURL, name, price, description }) => {
  return (
    <div className="w-56 h-48 p-0 m-0">
      <Link key={id} href={`/producto/${id}`}>
        <div className="image-container p-0 m-0 ">
          <Image src={imageURL} width={10000} height={10000} alt="" className="hover:scale-110 transition-transform duration-300 transform-gpu"/>
        </div>
      
      </Link>
    </div>
    
  );

}


export default NormalCard