"use client";
import Image from "next/image";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export default function Orders({identificador,productos,total,status,direction, setOpen,setStatus}) {
    
    const handleDetalle = () =>{
      setOpen((cur) => !cur);
      setStatus(status)
    }
    return (
      <Card className="mt-6 md:w-[30%]">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Pedido # {identificador}
          </Typography>
          <div className="flex mb-4 w-full overflow-x-auto">
            {productos.map(item => <Image key={`image-pedido-${item.id}`} src={item.urlImage} width={80} height={80} alt="imagen"></Image>)}
          </div>
          
          <Typography className="text-lg">
          Dirección: {direction}
          </Typography>
          
          <Typography variant="h5" className="text-green-400">
           {status == "enProceso" ? "En Preparación": status == "enTransito" ? "En Camino": "Entregado"}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
        </CardFooter>
      </Card>
    );
  }