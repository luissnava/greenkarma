
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
    <div className="flex justify-center">
      <div className="mx-auto">
        <Link key={id} href={`/producto/${id}`}>
        
          <Image src={imageURL} width={400} height={100} alt="" className="hover:scale-110 transition-transform duration-300 transform-gpu"/>
        
      
        </Link>
      </div>
      
    </div>
    
  );

}


export default NormalCard