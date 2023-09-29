"use client";
import Image from "next/image";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export default function Suscriptions({identificador,productos,total,status,direction, setOpen,setStatus}) {
    
    const handleDetalle = () =>{
      setOpen((cur) => !cur);
      setStatus(status)
    }
    return (
      <Card className="mt-6 w-[30%]">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Pedido # {identificador}
          </Typography>
          <div className="flex mb-4">
            {productos.map(item => <Image key={`suscripimg-${item.id}`} src={item.urlImage} width={80} height={80}></Image>)}
          </div>
          
          <Typography className="text-lg">
          Dirección: {direction}
          </Typography>
          
          <Typography variant="h5" className="text-green-400">
           {status == "enProceso" ? "En Preparación": status == "enTransito" ? "En Camino": "Entregado"}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {/* <Button 
          className="text-center text-white w-full p-2 rounded-lg bg-[#003c25] hover:bg-green-700 
          focus:outline-none focus:border-green-500" onClick={handleDetalle}>Ver Detalle</Button> */}
        </CardFooter>
      </Card>
    );
  }