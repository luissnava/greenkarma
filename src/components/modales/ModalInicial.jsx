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
  ])

  const [zonas2,setZonas2] = useState([
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
            <div className="text-3xl mt-8 sm:text-xl sm:mt-5 md:mt-5 md:text-5xl font-bold text-gray-900 w-full text-center w-full">
                Envio Gratis
            </div>
            <div className="text-2xl font-bold text-gray-900 w-full text-center uppercase mb-10">
                A partir de $199
            </div>
            
            <div className="text-xl font-bold text-gray-900 w-full text-center mt-10 sm:mt-5 md:mt-10 lg:mt-10">
                
                <Link href={"/tienda"}
                className="text-xl sm:text-sm md:text-2xl text-center text-white p-3 rounded-lg bg-[#003c25] hover:bg-green-900 focus:outline-none focus:border-green-500">
                Comprar</Link>
            </div>
            <div className="mt-5 text-lg sm:text-md sm:mt-5 md:mt-10 md:text-xl font-bold text-gray-900 w-full text-center uppercase">
            ¡SEGUIRÉMOS AMPLIANDO NUESTRA ZONAS!
            </div>
            <div className="text-lg font-bold text-gray-900 w-full text-center uppercase mt-5">
            MANTENTE ATENTO A LAS ACTUALIZACIONES
            </div>
            
            <div  className="flex text-sm w-full mt-5 sm:text-sm sm:mt-5 sm:w-[50%] md:mt-10
            font-bold text-gray-900 md:w-full sm:w-[80%] uppercase p-5">
                 <div className="w-[50%]"> {
                    zonas?.map(item => (
                      <div key={item.id} className="text-center">{item.name}</div>
                  ))
                  }</div>
                  <div className="w-[50%]"> {
                    zonas2?.map(item => (
                      <div key={item.id} className="text-center">{item.name}</div>
                  ))
                  }</div>
            </div>
                
            
          </div>
          
        </DialogBody>
      </Dialog>
    </>
  );
}

