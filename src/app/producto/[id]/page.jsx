"use client";
import React, { useEffect, useContext, Suspense } from 'react'
import { Breadcrumbs, Carousel, Typography, Select, List, ListItem, Checkbox,
     Button,IconButton,Option, Alert} from '@material-tailwind/react';
import CounterNumber from '@/components/inputs/Counter';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
// import { data } from '../../../../public/data';
import {signIn,signOut,useSession} from "next-auth/react"
import { counterContext } from '@/app/context/counterContext';

const ProductSelected = ({params}) => {

    const {data: session} = useSession()
    const [options,setOptions] = useState([
        {id: 1, name: "Compra Única" ,checked: false, valor: "compraUnica"},
        {id: 2, name: "Compra Recurrente", checked: false, valor: "compraRecurrente"}
    ])
    const [selectOption, setSelectOption] = useState('');
    const [selectEnvasePaquete,setSelecEnvasePaquete] = useState("");
    const [selectEnvaseProducto,setSelecEnvaseProducto] = useState("");
    const [litros,setLitros] = useState("")
    const [producto,setProducto] = useState({})
    const [notificacion,setNotificacion] = useState(false)
    const [check,setCheck] = useState("")
    const [periodo,setPeriodo] = useState("")
    const [precio, setPrice] = useState(0)
    const [cantidad,setCantidad] = useState(1)
    const {igualar} = useContext(counterContext)

    const getProductos = async () => {
        const lista = []
        const response = await fetch("/api/getProductos", {
            method: "POST",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response) {
            if (response.ok == true && response.status == 200) {
                const data = await response.json()
                if (data) {
                    const productos = data.productos.map(item => ({
                        id: item.id,
                        status:item.status,
                        categorie: item.categorie,
                        name: item.name,
                        price: item.price,
                        prices: item.prices,
                        suscriptions: item.suscriptions,
                        imagen: item.imagen,
                        imagenes: item.imagenes,
                        litros: item.litros,
                        incluye: item.incluye,
                        description: item.description,
                        date_created: item.createdAt,
                        date_updated: item.updateAt
                    }))
                    const selectedProduct = productos.find(product => product.id == params.id);
                    if (selectedProduct) {
                        setProducto(selectedProduct)
                        if (selectedProduct.litros) {
                            setLitros(selectedProduct.litros)
                        }
                    }
                }

            } else {
                console.log("Error del Servidor");
            }
        }
    }
    
    
    const handleSelectOption = (event) =>{
        setSelectOption(event)
        settingPriceProducto(event)
    }

    const handleSelectEnvasePaquete = (event) =>{
        if (event !== "conEnvase") {
            settingPricePaquetes(event)
        }
        setSelecEnvasePaquete(event)
    }

    const handleSelectEnvaseProduct = (event) =>{
        setSelecEnvaseProducto(event)
    }
    
    const handlePeriodo = (event) =>{
        setPeriodo(event)
    }

    const settingPricePaquetes = (event) =>{
        if (producto.categorie === "paquetes") {
            const {price1,price2,price3,price4,price5,price6,price7,price8,price9,price10} = producto.prices
            switch (event) {
                case 'masEnvase':
                    setPrice(parseFloat(price10).toFixed(2));
                break;
              case 'conEnvase1':
                  setPrice(parseFloat(price1).toFixed(2));
                  break;
              case 'conEnvase2':
                  setPrice(parseFloat(price2).toFixed(2));
                  break;
              case 'conEnvase3':
                  setPrice(parseFloat(price3).toFixed(2));
                  break;
              case 'conEnvase4':
                  setPrice(parseFloat(price4).toFixed(2));
                  break;
                case 'conEnvase5':
                  setPrice(parseFloat(price5).toFixed(2));
                  break;
                case 'conEnvase6':
                  setPrice(parseFloat(price6).toFixed(2));
                break;
                case 'conEnvase7':
                  setPrice(parseFloat(price7).toFixed(2));
                break;
                case 'conEnvase8':
                  setPrice(parseFloat(price8).toFixed(2));
                break;
                case 'conEnvase9':
                  setPrice(parseFloat(price9).toFixed(2));
                break;
              default:
                  setPrice(parseFloat(producto.price).toFixed(2));
                break;
            }
        } 
    }
    const settingPriceProducto = (event) =>{
        if (producto.categorie !== "envase" && producto.categorie !== "paquetes") {

            const {price1, price2} = producto.prices;
            console.log(producto.prices);
            console.log(price1);
            console.log(price2);
            switch (event) {
                case '950ml':
                    if (selectEnvaseProducto == "masEnvase") {
                        setPrice(parseFloat(producto.price +20))
                    }else{
                        
                        setPrice(parseFloat(producto.price).toFixed(2))
                    }
                    break;
                case '3.78L':
                    if (selectEnvaseProducto == "masEnvase") {
                        if (producto.description == "spry") {
                            setPrice(parseFloat(price1).toFixed(2) +20)
                        }else{

                            setPrice(parseFloat(producto.price).toFixed(2) +20)
                        }
                    }else{
                        if (producto.description == "spry") {
                            setPrice(parseFloat(price1).toFixed(2))
                        }else{

                            setPrice(parseFloat(producto.price).toFixed(2))
                        }
                    }
                    break;
                case '5L':
                    
                    if (selectEnvaseProducto == "masEnvase") {
                        setPrice(parseFloat(price1 +20))
                    }else{
                        setPrice(parseFloat(price1).toFixed(2))
                        
                    }
                    break;
                case '10L':
                    
                    if (selectEnvaseProducto == "masEnvase") {
                        setPrice(parseFloat(price2 +20))
                    }else{
                        setPrice(parseFloat(price2).toFixed(2))
                    }
                    break;

                
                
            }
            
        } else {
            setPrice(parseFloat(producto.price).toFixed(2));
        }
    }

    const handleClickOption = (id) => {
        setOptions((prevOptions) => 
          prevOptions.map((item) => ({
            ...item,
            checked: item.id === id ? !item.checked : false // Desactivar los demás y activar/desactivar el actual
          }))
        );
    }
    
    useEffect(()=>{
        const check = options.find(item => item.checked !== false)
        if (check) {
            // console.log(check.valor);
            setCheck(check.valor)
        }else{
            setCheck("")
        }
    },[options])

    const handleSubmit = async () =>{
        const tipoCompra = options.find(item => item.checked !== false)
        const total = parseFloat(precio * cantidad).toFixed(2)
        let productos = {}
       
        if (session) {
            const userId = session.user.email
            productos =  {
                idProduct: producto.id,
                categorie: producto.categorie,
                nameProduct: producto.name,
                priceUnidad: precio,
                priceProduct: total,
                sizeProduct: selectOption,
                contentProduct: selectEnvaseProducto ? selectEnvaseProducto: selectEnvasePaquete,
                cantidadProduct: cantidad,
                tipoCompra: tipoCompra.valor ? tipoCompra.valor : "",
                periodoSuscription: periodo,
                mensual: producto.mensual,
                trimestral: producto.trimestral,
                urlImage: selectOption == "3.78L" ? producto.imagenes[0] : selectOption == "5L" ? (producto.imagenes[2] ? producto.imagenes[2] : producto.imagenes[0]) : selectOption == "10L" ? (producto.imagenes[2] ? producto.imagenes[2]: producto.imagenes[0]) : selectOption == "950ml"  ? (producto.imagenes[2] ? producto.imagenes[2] : producto.imagenes[0])  : producto.imagenes[0]
            }
            const response = await fetch("/api/addCarrito", {
                method: "POST",
                body: JSON.stringify({userId,productos}),
                headers: {
                'Content-Type' : 'application/json'
                }
            })
            const data = await response.json()
            const agregados = data.data.products
            igualar(agregados.length)
            if (data.success == true) {
                  
                setOptions((prevOptions) => 
                    prevOptions.map((item) => ({
                    ...item,
                    checked: false
                    }))
                );
                setPrice(0)
                setSelecEnvasePaquete("")
                setSelecEnvaseProducto("")
                setSelectOption("")
                setCantidad(1)
                setPeriodo("")
                setNotificacion(true)
                setTimeout(() => {
                    setNotificacion(false);
                    window.location.reload();
                }, 1000);
            }
        }else{
            productos =  {
                idProduct: producto.id,
                categorie: producto.categorie,
                nameProduct: producto.name,
                priceUnidad: precio,
                priceProduct: total,
                sizeProduct: selectOption,
                contentProduct: selectEnvaseProducto ? selectEnvaseProducto: selectEnvasePaquete,
                cantidadProduct: cantidad,
                tipoCompra: tipoCompra.valor ? tipoCompra.valor : "",
                periodoSuscription: periodo,
                mensual: producto.mensual,
                trimestral: producto.trimestral,
                urlImage: selectOption == "3.78L" ? producto.imagenes[0] : selectOption == "5L" ? (producto.imagenes[2] ? producto.imagenes[2] : producto.imagenes[0]) : selectOption == "10L" ? (producto.imagenes[2] ? producto.imagenes[2]: producto.imagenes[0]) : selectOption == "950ml"  ? (producto.imagenes[2] ? producto.imagenes[2] : producto.imagenes[0])  : producto.imagenes[0]
            }
            const datalocal = localStorage.getItem('carrito')
            // Si localstorage existe,  actualiza
            if (datalocal !== null) {
                const copia = JSON.parse(datalocal)
                if (copia) {
                    copia.push(productos)
                    localStorage.setItem("carrito",JSON.stringify(copia))
                    igualar(copia.length)
                }
                
            }
            // Si no existe, inserta datos en localstorage 
            else{
               localStorage.setItem('carrito',JSON.stringify([productos]))
            }
            setOptions((prevOptions) => 
            prevOptions.map((item) => ({
            ...item,
            checked: false
            })));

            setPrice(0)
            setSelecEnvasePaquete("")
            setSelecEnvaseProducto("")
            setSelectOption("")
            setCantidad(1)
            setPeriodo("")
            setNotificacion(true)
            setTimeout(() => {
                setNotificacion(false);
                window.location.reload()
            }, 1000);
        }
      
        
       
    }

    useEffect(() =>{
        getProductos()
        
    },[params.id])

    
    return (
        <div className=''>
        <div className="flex items-center justify-center">
            <div className="block w-[70%] md:flex lg:flex sm:block mt-0 p-0 mt-32">
                <div className="w-full">
                    <Carousel
                    className="w-full"
                    prevArrow={({ handlePrev }) => (
                        <IconButton
                        variant="text"
                        color="black"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-2/4 left-4 -translate-y-2/4"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                        </IconButton>
                    )}
                    nextArrow={({ handleNext }) => (
                        <IconButton
                        variant="text"
                        color="black"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute top-2/4 !right-4 -translate-y-2/4"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                        </IconButton>
                    )}
                    >
                        {producto.imagenes?.map((item,index) =>(
                            <Image key={`imagen-${index}`} src={item} width={1000} height={1000} alt="image-2" 
                            className="h-full w-full object-cover p-10"/>
                        ))}
                    
                    </Carousel>
                </div>

                <div className="w-full lg:w-[80%] md:w-[80%] sm:w-full p-2">
                    <div className="text-2xl">
                        {producto.name}
                    </div>
                    <div className="text-xl">
                        <div className="text-xl">
                        {   
                            precio > 0 ? `$ ${precio}` : `$ ${producto.price}`
                        }
                        </div>

                    </div>

                    
                    <div className="mt-4">
                        <div className="p-2">
                            {
                            producto.categorie !== "envase" && producto.categorie !== "paquetes" ?
                            <Typography color="gray" className="font-medium mb-2">
                                Tamaño
                            </Typography>: <></>
                            }
                            {
                                producto.categorie !== "paquetes" && producto.categorie !== "envase" ?
                                (
                                    litros ? (
                                        <Select label="Elegir" onChange={handleSelectOption}>
                                            {
                                                litros.map((item,index) => (
                                                    <Option key={`opc-${index}`} value={item}>{item}</Option>
                                                ))
                                            }
                                        </Select> 
                                    ) : null
                                    
                                )
                                
                                : <></>
                            }
                            {
                                producto.categorie !== "envase" ? <Typography color="gray" className="font-medium mt-2 mb-2">
                                Selecciona tu Envase
                            </Typography>: <></>
                            }
                            {
                                producto.categorie == "paquetes" ? 
                                <Select label="Elegir" onChange={handleSelectEnvasePaquete}>
                                    <Option value="masEnvase">+ Envases</Option>
                                    <Option value="conEnvase1">Tengo 1 envase GreenKarma</Option>
                                    <Option value="conEnvase2">Tengo 2 envases GreenKarma</Option>
                                    <Option value="conEnvase3">Tengo 3 envases GreenKarma</Option>
                                    <Option value="conEnvase4">Tengo 4 envases GreenKarma</Option>
                                    <Option value="conEnvase5">Tengo 5 envases GreenKarma</Option>
                                    <Option value="conEnvase6">Tengo 6 envases GreenKarma</Option>
                                    <Option value="conEnvase7">Tengo 7 envases GreenKarma</Option>
                                    <Option value="conEnvase8">Tengo 8 envases GreenKarma</Option>
                                    <Option value="conEnvase9">Tengo 9 envases GreenKarma</Option>
                                </Select> : producto.categorie !== "envase" ?
                                <Select label="Elegir" onChange={handleSelectEnvaseProduct}>
                                    <Option value="masEnvase">+ Envase</Option>
                                    <Option value="conEnvase">Ya tengo mi envase GreenKarma</Option>
                                </Select>: <></>
                                
                            }
                                        
                        </div>



                        <div className="w-full p-2">
                            <Typography color="gray" className="font-medium mt-2 mb-2">
                                Cantidad
                            </Typography>
                            <div className="">

                                
                                <CounterNumber id={params.id} valor={""} contador={cantidad} setCount={setCantidad} 
                                categorie={producto.categorie}></CounterNumber>
                                
                            </div>
                        </div>

                        {/* Section date */}
                        <div className="mt-4">
                            {
                                producto.categorie !== "envase" ? 
                                <List>
                                    {
                                        options?.map(option => (                                                       
                                            <ListItem 
                                            key={option.id}
                                            className="transition-all hover:scale-105 hover:before:opacity-0 
                                            border border-gray-300 mt-2"
                                            onClick={()=> handleClickOption(option.id)}>
                                            <Checkbox 
                                                checked={option.checked}
                                                label={
                                                    option.name
                                                }
                                                containerProps={{
                                                    className: "-mt-4",
                                                }}
                                                className="rounded-full"
                                                id={option.id}
                                                key={`check-${option.id}`}
                                            />
                                            </ListItem>
                                            
                                        ))
                                    }
                                    <div className="mt-4 transition-all">
                                        {options.find(option => option.id === 2)?.checked ? (
                                            <Select placeholder="Selecciconar Compra" label="Selección de Compra" onChange={handlePeriodo}>
                                            <Option value='Mensual' >Mensual</Option>
                                            <Option value='Trimestral'>Trimestral</Option>
                                            </Select>
                                        ) : null}
                                    </div>
                                </List> :
                                <></>
                            }
                        </div>
                    </div>
                    <div className="mt-4 inline-block px-2 w-full space-y-5">
                        {
                        producto.categorie == "paquetes" ? 
                        <Button className={`text-center text-white w-full p-3 
                            rounded-lg bg-[#003c25] hover:bg-green-700 
                            focus:outline-none focus:border-green-500`}
                            onClick={handleSubmit}
                            disabled={selectEnvasePaquete == "" || check == "" ? true : false}>
                        Agregar al carrito
                        </Button> :  <Button className={`text-center text-white w-full p-3 
                            rounded-lg bg-[#003c25] hover:bg-green-700 
                            focus:outline-none focus:border-green-500`}
                            onClick={handleSubmit}
                            disabled={ selectEnvaseProducto == "" || selectOption == "" || check == "" ? true : false}>
                        Agregar al carrito
                        </Button>
                        
                        }
                        {
                notificacion && <Alert color="green">Producto agregado, revisa tu carrito</Alert>
                }
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    
        </div>
        
    )
}

export default ProductSelected
