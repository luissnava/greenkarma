"use client"
import React, { useEffect, useState } from "react";
import { CardSmall } from "./cards/CardSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react"

const Carrito = ({ open, onCloseCarrito, articulos, mensaje }) => {
  const { data: session } = useSession()
  const [openRight, setOpenRight] = useState(false);
  const [datosCarrito, setDatosCarritos] = useState()
  const [subtotal, setSubtotal] = useState()
  useEffect(() => {
    if (articulos) {
      // console.log(articulos);
      let total = 0;

      if (session) {
        if (session.user.email) {
          const data = articulos.map((item) => (item.products))
          data[0].forEach((item) => {
            total += parseFloat(item.priceProduct);
          });
          total = total.toFixed(2);
          setDatosCarritos(data[0])
        }
        
      } else {
        articulos.map(item => (total += parseFloat(item.priceProduct)));
        total = total.toFixed(2)
        setDatosCarritos(articulos)
      }
      
      setSubtotal(total);
    }
  }, [articulos])

  const closeDrawerRight = () => {
    onCloseCarrito(); // Llamamos a la función para cerrar el carrito en el componente padre
  };

  return (
    <>
      <Drawer
        placement="right"
        overlay={false}
        open={open}
        onClose={closeDrawerRight}
        className="h-full"
        size={400}
      >
        <div className="flex items-center h-[20%] bg-[#003c25]">
          <div className="ml-auto">

            <FontAwesomeIcon icon={faXmark} color="white" size="xl" width={80} onClick={closeDrawerRight} className="cursor-pointer" />
          </div>

          <div className="ml-auto w-full flex justify-center mr-10">
            <Typography variant="lead" color="white">
              Carrito
            </Typography>
          </div>
        </div>

        <div className=" my-auto overflow-y-auto h-[50%]">
          {
            datosCarrito ? datosCarrito.map((item, index) => (<CardSmall key={index} data={item}></CardSmall>)) : <div className="h-full flex items-center justify-center text-xl">Carrito Vacío</div>

          }

        </div>
        <div className="h-[20%] p-10">
          <Typography variant="h4">
            Subtotal
          </Typography>
          <Typography variant="h4">
            {
              subtotal ? `${subtotal} MXN` : `0.00 MXN`
            }
          </Typography>
        </div>
        <div className="mt-auto w-full flex justify-center">
          {
            datosCarrito ? (
              <>
                <Link href={"/carrito"} onClick={closeDrawerRight}
                  className="text-center text-white w-[80%] p-2 rounded-lg bg-[#003c25] hover:bg-green-700 focus:outline-none focus:border-green-500">
                  Ver Carrito</Link>
              </>
            ) : mensaje ? (<Link href={"/tienda"} onClick={closeDrawerRight}
              className="text-center text-white w-[80%] p-2 rounded-lg bg-[#003c25] hover:bg-green-700 focus:outline-none focus:border-green-500">
              Hacer Compra</Link>)
              : (<></>)
          }
        </div>
      </Drawer>

    </>
  );
}

export default Carrito