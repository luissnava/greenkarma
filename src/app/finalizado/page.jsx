"use client";
import React, {useEffect, useState, useContext} from 'react'
import Link from 'next/link';
import {counterContext} from '@/app/context/counterContext';


const FinalOrder = () => {
    const {reset, session} = useContext(counterContext)
    const [ejecutado, setEjecutado] = useState(false);
    let orders = null

    const getOrder = async () => {
        console.log("function getOrder");
        if (session) {
            const user = session.user.email
            if (user) {
                // console.log("buscando ordenes");
                const response = await fetch("/api/getOrder", {
                    method: "POST",
                    body: JSON.stringify(
                        {user: user}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {

                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()

                        if (data) {
                            if (data.ordenes.length > 0) {
                                // console.log("ordenes encontradas -> ", data);
                                orders = data.ordenes;
                            } else {
                                console.log("Sin Ordenes");
                            }

                        }

                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
        } else {
            console.log("sin session");
        }
    }

    const handlePedido = async () => {
        // console.log("funcion insert pedido");
        if (session) {
            const user = session.user.email
            if (user) {
                // console.log("insertando pedidos");
                const response = await fetch("/api/pedidos", {
                    method: "POST",
                    body: JSON.stringify(
                        {data: orders, user: user}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()
                        // console.log("Pedido registrado ->", data);
                        orders = null
                        reset()

                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
        }
    }

    const fetchData = async () => {
        await getOrder(); // Espera a que getOrder termine
        if (orders !== null) {
            await handlePedido();
            setEjecutado(true); // Marca como ejecutado para que no se ejecute nuevamente
        }else{
            console.log("no se seteo el estado ordenes");
        }
    }

    useEffect(() => {
        if (!ejecutado && session) {
          fetchData();
        }
      }, [ejecutado, session]);

    return (
        <div>
            <div className='w-full'>
                <div className="grid grid-cols-1 mx-auto flex justify-center items-center text-center p-5 w-full bg-fixed bg-cover bg-center h-full"
                    style={
                        {
                            backgroundImage: "url('/karma_fondo2.png')"
                        }
                }>
                    <div className="text-white text-center text-5xl md:text-5xl sm:text-xl mt-24">¡Gracias por comprometerte con nuestro planeta!</div>
                    <div className="text-white text-center text-4xl md:text-4xl sm:text-lg mb-5">Te devolvemos $10MXN por cada botella Green Karma que regreses</div>
                </div>
                <div className="flex text-2xl sm:text:2xl md:text-5xl items-center justify-center mt-24">¡Gracias por tu compra!</div>
                <div className="flex text-xl items-center justify-center">

                    <Link className="text-center text-white w-[50%] p-2
                                                                        rounded-lg bg-[#003c25] hover:bg-green-700
                                                                        focus:outline-none focus:border-green-500 mt-24 mb-10"
                        href={"/user"}>Ver Pedidos</Link>
                </div>
            </div>
        </div>
    )
}

export default FinalOrder
