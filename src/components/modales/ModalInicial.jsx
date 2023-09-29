"use client";
import React from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export function ModalInicial() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen((cur) => !cur);
  const [zonas, setZonas] = useState([
    {id: 1, name:"ATIZAPÁN DE ZARAGOZA,"},
    {id: 2, name:"NAUCALPAN,"},
    {id: 3, name:"TLALNEPANTLA,"},
    {id: 4, name:"HUIXQUILUCAN,"},
    {id: 5, name:"NICOLÁS ROMERO,"},
    {id: 6, name:"CUAUTILÁN IZCALLI"}
  ])
 
  return (
    <>
      
      <Dialog size="lg" open={open} handler={handleOpen} className="p-0">
        <DialogBody className="p-0">
        <div className="h-[90vh] image-modal p-0">
            <div className="flex justify-end p-5 cursor-pointer">
                <FontAwesomeIcon icon={faXmark} size="2x" color="black" onClick={handleOpen} className="font-light"/>
            </div>
            <div className="text-8xl font-bold text-gray-700 w-full text-center w-full">
                Envio Gratis
            </div>
            <div className="text-3xl font-bold text-gray-700 w-full text-center uppercase mb-10">
                A partir de $199
            </div>
            
            <div className="text-2xl font-bold text-gray-700 w-full text-center mt-20">
                
                <Link href={"/tienda"}
                className="text-center text-xl text-white p-3 rounded-lg bg-[#003c25] hover:bg-green-700 focus:outline-none focus:border-green-500">
                Comprar</Link>
            </div>
            <div className="sm:mt-8 text-xl font-bold text-gray-700 w-full text-center uppercase md:mt-32 mt-20">
            ¡SEGUIRÉMOS AMPLIANDO NUESTRA ZONAS!
            </div>
            <div className="text-sm text-gray-700 w-full text-center uppercase mt-5">
            MANTENTE ATENTO A LAS ACTUALIZACIONES
            </div>
            
            <div  className="flex mt-10 sm:mt-10 md:mt-10 justify-center text-sm font-bold text-gray-700 w-[50%] md:w-full sm:w-[80%] uppercase">
                  {
                    zonas?.map(item => (
                    
                      <div key={item.id} className="">{item.name}</div>
                  ))
                  }
            </div>
                
            
          </div>
          
        </DialogBody>
      </Dialog>
    </>
  );
}

