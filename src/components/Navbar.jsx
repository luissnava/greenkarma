"use client";
import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import {faBars, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Carrito from "./Carrito";
import Link from "next/link";
import {
    Collapse,
    Typography,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Badge
} from "@material-tailwind/react";
import {signIn,signOut,useSession} from "next-auth/react"
import { counterContext } from "@/app/context/counterContext";

export function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);
    const [isOpenCarrito, setIsOpenCarrito] = useState(false)
    const [articulos,setArticulos] = useState()
    const [mensaje,setMensaje] = useState(false)
    const {data: session} = useSession()
    const {counter,reset,igualar} = useContext(counterContext)
    const handleCloseCarrito = () => {
        setIsOpenCarrito(false);
        setMensaje(false)
    };
    
    const handleClickCarrito = async () => {
        if (session) {
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/getCarrito", {
                    method: "POST",
                    body: JSON.stringify({user}),
                    headers: {
                    'Content-Type' : 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()
                        data.message == "Sin Productos" ? setMensaje(true) : setArticulos(data.articulos)
                    }else{
                        console.log("Error del Servidor");
    
                    }
                }
            }
        }else{
            const data = localStorage.getItem('carrito')
            if (data !== null) {
                const articulos = JSON.parse(data)
                setArticulos(articulos)
            }else{
                setMensaje(true)
            }
            
        }
        
        setIsOpenCarrito(true);
    }

    return (
        <>
            <div className="w-full px-6 py-3 fixed z-50 bg-white">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography variant="h6" className="mr-4 cursor-pointer py-1.5">
                        <Link href={"/"}>
                            <Image src={"/green_karma_logo.webp"}
                                alt="Green_Karma"
                                width={100}
                                height={100}/>
                        </Link>
                    </Typography>
                    <div className="hidden lg:block">
                        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                                <Link href={"/"}
                                    className="flex items-center hover:text-green-500 transition-colors">Inicio</Link>
                            </Typography>
                            <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                                <Link href={"/tienda"}
                                    className="flex items-center hover:text-green-500 transition-colors">Tienda</Link>
                            </Typography>
                            <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                                <Link href={"/about"}
                                    className="flex items-center hover:text-green-500 transition-colors">Acerca De</Link>
                            </Typography>
                            <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                                <Menu placement="bottom-end">
                                    <MenuHandler>
                                        {
                                            session?.user ? <Avatar src={session.user.image} size="sm" alt="avatar" className="cursor-pointer"/> :<FontAwesomeIcon className="cursor-pointer"
                                            icon={faUser}></FontAwesomeIcon>
                                        }
                                    </MenuHandler>
                                    <MenuList>
                                        {
                                            session?.user ?(
                                            <>
                                            <MenuItem onClick={async ()=> {await signOut({
                                                callbackUrl: "/"
                                            })}}>
                                                Salir 
                                            </MenuItem>
                                            <MenuItem>
                                                <Link href={"/user"}>Mi Cuenta</Link>
                                            </MenuItem>
                                            </>
                                            ): 
                                            <MenuItem onClick={()=> signIn()}>Ingresar</MenuItem>
                                        }
                                    </MenuList>
                                </Menu>
                            </Typography>

                            <div className="cursor-pointer" onClick={handleClickCarrito}>
                                {
                                    counter > 0 ? 
                                    
                                    <Badge content={counter} color="green">
                                        <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                                    </Badge>
                                     : <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                                }
                                
                                
                            </div>

                        </ul>
                    </div>
                    <IconButton variant="text" className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={
                            () => setOpenNav(!openNav)
                        }>
                        {
                        openNav ? (
                            <FontAwesomeIcon icon={faBars}/>
                        ) : (
                            <FontAwesomeIcon icon={faBars}/>
                        )
                    } </IconButton>
                    <Typography as="li" variant="lead" color="blue-gray" className="p-1 ml-3 icono-oculto font-medium">
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                {
                                    session?.user ? <Avatar src={session.user.image} size="sm" alt="avatar" className="cursor-pointer"/> :<FontAwesomeIcon className="cursor-pointer"
                                    icon={faUser}></FontAwesomeIcon>
                                }
                            </MenuHandler>
                            <MenuList>
                                {
                                    session?.user ?(
                                    <>
                                    <MenuItem onClick={async ()=> {await signOut({
                                        callbackUrl: "/"
                                    })}}>
                                        Salir 
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href={"/user"}>Mi Cuenta</Link>
                                    </MenuItem>
                                    </>
                                    ): 
                                    <MenuItem onClick={()=> signIn()}>Ingresar</MenuItem>
                                }
                            </MenuList>
                        </Menu>
                    </Typography>
                     <div className="cursor-pointer ml-4 icono-oculto" onClick={handleClickCarrito}>
                        {
                            counter > 0 ? 
                            
                            <Badge content={counter} color="green">
                                <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                            </Badge>
                                : <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                        }
                    </div>
                    

                </div>
                <Collapse open={openNav}>
                    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                            <Link href={"/"}
                                className="flex items-center hover:text-green-500 transition-colors" 
                                onClick={() => setOpenNav(!openNav)}>Inicio</Link>
                        </Typography>
                        <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                            <Link href={"/tienda"}
                                className="flex items-center hover:text-green-500 transition-colors"  
                                onClick={() => setOpenNav(!openNav)}>Tienda</Link>
                        </Typography>
                        <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                            <Link href={"/about"}
                                className="flex items-center hover:text-green-500 transition-colors"  
                                onClick={() => setOpenNav(!openNav)}>Acerca De</Link>
                        </Typography>
                        {/* <Typography as="li" variant="lead" color="blue-gray" className="p-1 font-medium">
                            <Menu placement="bottom-end">
                                <MenuHandler>
                                    {
                                        session?.user ? <Avatar src={session.user.image} size="sm" alt="avatar" className="cursor-pointer"/> :<FontAwesomeIcon className="cursor-pointer"
                                        icon={faUser}></FontAwesomeIcon>
                                    }
                                </MenuHandler>
                                <MenuList>
                                    {
                                        session?.user ?(
                                        <>
                                        <MenuItem onClick={async ()=> {await signOut({
                                            callbackUrl: "/"
                                        })}}>
                                            Salir
                                        </MenuItem>
                                        <MenuItem>
                                            <Link href={"/user"} onClick={() => setOpenNav(!openNav)}>Mis pedidos</Link>
                                        </MenuItem>
                                        </>
                                        ): 
                                        <MenuItem onClick={()=> signIn()}>Ingresar</MenuItem>
                                    }
                                </MenuList>
                            </Menu>
                        </Typography>

                        <div className="cursor-pointer" onClick={() => {setOpenNav(!openNav); handleClickCarrito()}}>
                            <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                        </div> */}

                    </ul>
                </Collapse>
            </div>

            <Carrito open={isOpenCarrito} onCloseCarrito={handleCloseCarrito} articulos={articulos} mensaje={mensaje}/>
        </>

    );
}
