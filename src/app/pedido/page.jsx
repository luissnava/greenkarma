"use client";
import React, { useEffect, useState, useContext } from "react";
import {
    Input,
    Button,
    Typography,
    Dialog,
    DialogBody
} from "@material-tailwind/react";
import { signIn, signOut, useSession } from "next-auth/react"
import Stripe from "stripe";
export default function CheckoutForm({open,setOpen,carrito,totalPedido}) {
    const { data: session } = useSession()
    const [nombre,setNombre] = useState("")
    const [correo,setCorreo] = useState("")
    const [direction,setDirection] = useState("")
    const [codigoPostal,setCodigoPostal] = useState("")
    const [municipio,setMunicipio] = useState("")
    const [localidad,setLocalidad] = useState("")
    const [telefono,setTelefono] = useState("")
    const [codigos,setCodigos] = useState()
    const [status,setStatus] = useState(true)
    const [mensaje,setMensaje] = useState("")
    
    const handleCodigo = (event) =>{
        setCodigoPostal(event.target.value)
        const code = event.target.value
        const elemento = codigos.find(item => item.codigo == code)
        if (code.length == 5 && !elemento) {
            setMensaje("Lo sentimos, nuestros productos no están disponibles actualmente en tu región.")
        }else{
            setMensaje("")
        }
        if (elemento) {
            setMunicipio(elemento.municipio)
            setLocalidad(elemento.asentamiento)
        }else{
            setMunicipio("")
            setLocalidad("")
        }
       
    }
    const handleCorreo = (event) =>{
        setCorreo(event.target.value)
    }
    const handleTelefono = (event) =>{
        setTelefono(event.target.value)
    }
    const handleName = (event) =>{
        setNombre(event.target.value)
    }
    const handleDirection = (event) =>{
        setDirection(event.target.value)
    }
  
    const handleOrders = async(event) =>{
        event.preventDefault();
        
        if (session) {
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/orders", {
                    method: "POST",
                    body: JSON.stringify(
                      {user: user, 
                      phone: telefono,
                      productos: carrito, 
                      total:totalPedido, 
                      direction:direction, 
                      location:localidad,
                      delegation: municipio,
                      cp:codigoPostal}),
                      headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    console.log(response);
                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()
                        
                        if (data) {
                          handlePagos();
                        }
                        
                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
        }
    }

    const handlePagos = async() =>{
        if (session) {
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/pagos", {
                    method: "POST",
                    body: JSON.stringify(carrito),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()
                        window.location.href = data.url
                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
        }
       
    }

    const loadPricesStripe = async () =>{
        const response = await fetch("/api/loadprices", {
            method: "POST",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response) {
            if (response.ok == true && response.status == 200) {
                const data = await response.json()
                console.log("prices load");
                console.log(data);
                console.log("carrito");
                console.log(carrito);
            } else {
                console.log("Error del Servidor");
            }
        }
        // if (session) {
        //     const user = session.user.email
        //     if (user) {
        //         const response = await fetch("/api/loadprices", {
        //             method: "POST",
        //             body: JSON.stringify(),
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //         if (response) {
        //             if (response.ok == true && response.status == 200) {
        //                 const data = await response.json()
        //                 console.log(data);
        //             } else {
        //                 console.log("Error del Servidor");
        //             }
        //         }
        //     }
            
        // }
    }

    const handleOpenCloseModal = () =>{
        setOpen((cur) => !cur);
    }

    const loadCodigos = async () =>{
        // const response = await fetch("/api/codigos", {
        //     method: "POST",
        //     body: JSON.stringify(),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // if (response) {
        //     if (response.ok == true && response.status == 200) {
        //         const data = await response.json()
        //         setCodigos(data.codigospostales)
        //     } else {
        //         console.log("Error del Servidor");
        //     }
        // }
        if (session) {
               
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/codigos", {
                    method: "POST",
                    body: JSON.stringify({ user }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()
                        setCodigos(data.codigospostales)
                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
            
        }
    }

    useEffect(()=>{
        if (session) {
            const user = session.user
            if (user) {
                setCorreo(user.email)
                setNombre(user.name)
            }
        }
       loadCodigos()
       loadPricesStripe()
       
    },[session])

    useEffect(()=>{
        if (correo && nombre && direction && codigoPostal && telefono && localidad && municipio) {
            setStatus(false)
           
        }else{
            setStatus(true)
        }
    },[correo,nombre,direction,municipio,localidad,telefono])
    
    return (
        <div className="w-full">
            
            <Dialog size="sm"
                open={open}
                // handler={handleOpenCloseModal}
                className="z-50">
                
                <DialogBody className="p-10 rounded overflow-y-auto">
                    <form className="flex flex-col gap-4">
                                    
                        <div>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-4 font-medium"
                            >Correo para confirmar el pedido
                            </Typography>
                            <Input type="email" label="Correo" required={true} value={correo} onChange={handleCorreo}/>
                        </div>
                        <div>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-4 font-medium"
                            >Nombre Completo
                            </Typography>
                            <Input type="text" label="Nombres/Apellidos"  required={true} value={nombre} onChange={handleName}/>
                        </div>
                        <div>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-4 font-medium"
                            >Telefono
                            </Typography>
                            <Input
                                label="Telefono"
                                maxLength={10}
                                required={true}
                                onChange={handleTelefono}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                        </div>
                        <div>
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-4 font-medium"
                            >Dirección Completa
                            </Typography>
                            <Input type="text" label="Calle/#Número"  required={true} onChange={handleDirection}/>
                        </div>
                        <div className="my-4 flex items-center gap-4">
                            <Input
                                label="Código Postal"
                                maxLength={5}
                                onChange={handleCodigo}
                                containerProps={{ className: "min-w-[72px]" }}
                                required={true}
                            />
                            
                            <Input
                                label="Municipio"
                                value={municipio}
                                readOnly={true}
                                required={true}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                        </div>
                        {
                            mensaje !== "" ? <div className="text-red-600 text-sm">{mensaje}</div> :<></>
                        }
                        <div className="flex items-center gap-4">
                            
                            <Input
                                label="Localidad"
                                readOnly={true}
                                required={true}
                                value={localidad}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                            
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                            <Button className="text-center text-white w-full p-3 
                            rounded-lg bg-red-700 
                            hover:bg-red-400 
                            focus:outline-none 
                            focus:border-red-500" onClick={handleOpenCloseModal}>Cancelar</Button>

                            <Button className="text-center text-white w-full p-3 
                            rounded-lg bg-[#003c25] 
                            hover:bg-green-700 
                            focus:outline-none 
                            focus:border-green-500" onClick={handleOrders} disabled={status}>Realizar Pedido</Button>

                            
                        </div>

                    </form>
              
                    
                </DialogBody>
            </Dialog>
                
        </div>
    );
}