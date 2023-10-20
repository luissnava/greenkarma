"use client";
import React, {useState, useEffect, useContext, Suspense} from "react";
import {
    Button,
    IconButton,
    Dialog,
    DialogBody,
    Carousel,
    Select,
    Option,
    List,
    ListItem,
    Typography,
    Checkbox,
    Alert,
    Card
} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft,faXmark} from "@fortawesome/free-solid-svg-icons";
import CounterNumber from "../inputs/Counter";
import Image from "next/image";
import {signIn,signOut,useSession} from "next-auth/react"
import { counterContext } from "@/app/context/counterContext";
function getWidth() {
    if (typeof window !== 'undefined') {
      // Solo se ejecutará en el cliente
      return window.innerWidth;
    }
    return 0; // O un valor predeterminado si window no está disponible
}

export function CardProduct({displayData, currentPage,totalPages,setCurrentPage}) {
   
    
    const {data: session} = useSession()
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState({})
    const [notificacion,setNotificacion] = useState(false)
    const [selectOption,setSelectOption] = useState("");
    const [selectEnvasePaquete,setSelecEnvasePaquete] = useState("");
    const [selectEnvaseProducto,setSelecEnvaseProducto] = useState("");
    const [check,setCheck] = useState("")
    const [cantidad,setCantidad] = useState(1)

    const [options,setOptions] = useState([
        {id: 1, name: "Compra Única" ,checked: false, valor: "compraUnica"},
        {id: 2, name: "Compra Recurrente", checked: false, valor: "compraRecurrente"}
    ])
    const [periodo,setPeriodo] = useState("")
    const [precio, setPrice] = useState(0)

    const [anchoPantalla,setAncho] = useState(getWidth())

    const {igualar} = useContext(counterContext)
   
    const handleSubmit = async () =>{
        const tipoCompra = options.find(item => item.checked !== false)
        const total = parseFloat(precio * cantidad).toFixed(2)
        let productos = {}
       
        if (session) {
            const userId = session.user.email
            if (products.categorie == "envase") {
                productos = {
                    idProduct:products.id,
                    nameProduct: products.name,
                    priceUnidad: 0,
                    priceProduct: 0,
                    urlImage: products.cantidadImagenes[0],
                    cantidadProduct: 1
                }
            }else{
                 productos =  {
                    idProduct: products.id,
                    categorie: products.categorie,
                    nameProduct: products.name,
                    priceUnidad: precio,
                    priceProduct: total,
                    sizeProduct: selectOption,
                    contentProduct: selectEnvaseProducto ? selectEnvaseProducto: selectEnvasePaquete,
                    cantidadProduct: cantidad,
                    tipoCompra: tipoCompra.valor ? tipoCompra.valor : "",
                    periodoSuscription: periodo,
                    urlImage: selectOption == "3.78L" ? products.cantidadImagenes[0] : selectOption == "5L" ? (products.cantidadImagenes[2] ? products.cantidadImagenes[2] : products.cantidadImagenes[0]) : selectOption == "10L" ? products.cantidadImagenes[2] : selectOption == "950ml"  ? products.cantidadImagenes[2] : products.cantidadImagenes[0]
                }
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
                    setOpen((cur) => !cur);
                  }, 2000);
            
            }
        }
        else{
           
            // console.log(products);
            if (products.categorie == "envase") {
                productos = {
                    idProduct:products.id,
                    nameProduct: products.name,
                    priceUnidad: 0,
                    priceProduct: 0,
                    urlImage: products.cantidadImagenes[0],
                    cantidadProduct: 1
                }
            }
            else{
                 productos =  {
                    idProduct: products.id,
                    categorie: products.categorie,
                    nameProduct: products.name,
                    priceUnidad: precio,
                    priceProduct: total,
                    sizeProduct: selectOption,
                    contentProduct: selectEnvaseProducto ? selectEnvaseProducto: selectEnvasePaquete,
                    cantidadProduct: cantidad,
                    tipoCompra: tipoCompra.valor ? tipoCompra.valor : "",
                    periodoSuscription: periodo,
                    urlImage: selectOption == "3.78L" ? products.cantidadImagenes[0] : selectOption == "5L" ? (products.cantidadImagenes[2] ? products.cantidadImagenes[2] : products.cantidadImagenes[0]) : selectOption == "10L" ? products.cantidadImagenes[2] : selectOption == "950ml"  ? products.cantidadImagenes[2] : products.cantidadImagenes[0]
                }
            }

            const datalocal = localStorage.getItem('carrito')
            // Si localstorage existe, actualiza
            if (datalocal !== null) {
                const copia = JSON.parse(datalocal)
                if (copia) {
                    copia.push(productos)
                    localStorage.setItem("carrito",JSON.stringify(copia))
                    igualar(copia.length)
                }
            }
            else{
               localStorage.setItem('carrito',JSON.stringify([productos]))
               const local = localStorage.getItem('carrito')
               const datos = JSON.parse(local)
               igualar(datos.length)
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
                setOpen((cur) => !cur);
            }, 2000);
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

    const settingPricePaquetes = (event) =>{
        if (products.categorie === "paquetes") {
            switch (event) {
                case 'masEnvase':
                    setPrice(parseFloat(products.price10).toFixed(2));
                break;
              case 'conEnvase1':
                  setPrice(parseFloat(products.price1).toFixed(2));
                  break;
              case 'conEnvase2':
                  setPrice(parseFloat(products.price2).toFixed(2));
                  break;
              case 'conEnvase3':
                  setPrice(parseFloat(products.price3).toFixed(2));
                  break;
              case 'conEnvase4':
                  setPrice(parseFloat(products.price4).toFixed(2));
                  break;
                case 'conEnvase5':
                  setPrice(parseFloat(products.price5).toFixed(2));
                  break;
                case 'conEnvase6':
                  setPrice(parseFloat(products.price6).toFixed(2));
                break;
                case 'conEnvase7':
                  setPrice(parseFloat(products.price7).toFixed(2));
                break;
                case 'conEnvase8':
                  setPrice(parseFloat(products.price8).toFixed(2));
                break;
                case 'conEnvase9':
                  setPrice(parseFloat(products.price9).toFixed(2));
                break;
              default:
                  setPrice(parseFloat(products.price).toFixed(2));
                break;
            }
        } 
    }

    const settingPriceProducto = (event) =>{
        if (products.categorie !== "envase" && products.categorie !== "paquetes") {
            switch (event) {
                case '950ml':
                    if (selectEnvaseProducto == "masEnvase") {
                        setPrice(parseFloat(products.price_original)+ 20)
                    }else{
                        
                        setPrice(parseFloat(products.price_original).toFixed(2))
                    }
                    break;
                case '3.78L':
                    if (selectEnvaseProducto == "masEnvase") {
                        setPrice(parseFloat(products.price_original) +20)
                    }else{
                        if (products.description == "spry") {
                            setPrice(parseFloat(products.price1).toFixed(2))
                        }else{

                            setPrice(parseFloat(products.price_original).toFixed(2))
                        }
                    }
                    break;
                case '5L':
                    
                    if (selectEnvaseProducto == "masEnvase") {
                        setPrice(parseFloat(products.price1) +20)
                    }else{
                        setPrice(parseFloat(products.price1).toFixed(2))
                        
                    }
                    break;
                case '10L':
                    
                    if (selectEnvaseProducto == "masEnvase") {
                        setPrice(parseFloat(products.price2) +20)
                    }else{
                        setPrice(parseFloat(products.price2).toFixed(2))
                    }
                    break;

                case 'conEnvase':
                    if (selectOption == "950ml") {
                        setPrice(parseFloat(products.price_original).toFixed(2))
                    }
                    
                    if (selectOption == "3.78L") {
                        if (products.description == "spry") {
                            
                            setPrice(parseFloat(products.price1).toFixed(2))
                        }else{
                            setPrice(parseFloat(products.price_original).toFixed(2))
                        }
                    }
                    if (selectOption == "5L") {
                        setPrice(parseFloat(products.price1).toFixed(2))
                    }
                    if (selectOption == "10L") {
                        setPrice(parseFloat(products.price2).toFixed(2))
                    }
                break;
                case 'masEnvase':
                    if (selectOption == "950ml") {
                        setPrice(parseFloat(products.price_original)+20)
                    }
                    
                    if (selectOption == "3.78L") {
                        if (products.description == "spry") {
                            setPrice(parseFloat(products.price1)+ 20)
                        }else{
                            setPrice(parseFloat(products.price2)+ 20)
                        }
                    }
                    if (selectOption == "5.L") {
                        setPrice(parseFloat(products.price2)+ 20)
                    }
                    if (selectOption == "10L") {
                        setPrice(parseFloat(products.price2)+ 20)
                    }
                break;

                
            }
            
        } else {
            setPrice(parseFloat(products.price).toFixed(2));
        }
    }
   
    const handlePeriodo = (event) =>{
        setPeriodo(event)
    }

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleClickOption = (id) => {
        
        setOptions((prevOptions) => 
          prevOptions.map((item) => ({
            ...item,
            checked: item.id === id ? !item.checked : false // Desactivar los demás y activar/desactivar el actual
          }))
        );
        setPeriodo("")
        
    }
    
    useEffect(()=>{
        const check = options.find(item => item.checked !== false)
        if (check) {
            setCheck(check.valor)
        }else{
            setCheck("")
        }
    },[options])

    const handleVistaPrevia = (id,name,litros,description, prices, price, categorie,imagenes,mensual,trimestral) =>{
        
        if (id == 1) {
            setProducts({
                id: id,
                name: name,
                description: description,
                precio: price,
                categorie: categorie,
                cantidadImagenes: imagenes,
                
            })
        }
        else{
            setProducts({
                id: id,
                name: name,
                litros: litros,
                description: description,
                price_original: price,
                price1: prices[0].price1,
                price2: prices[0].price2,
                price3: prices[0].price3,
                price4: prices[0].price4,
                price5: prices[0].price5,
                price6: prices[0].price6,
                price7: prices[0].price7,
                price8: prices[0].price8,
                price9: prices[0].price9,
                price10: prices[0].price10,
                categorie: categorie,
                cantidadImagenes: imagenes,
                mensual: mensual,
                trimestral: trimestral
            }) 
        }
        setOpen((cur) => !cur);
        setOptions((prevOptions) =>
          prevOptions.map((item) => ({
            ...item,
            checked: false
          }))
        );
        setPrice(0);
        setSelecEnvasePaquete("")
        setSelecEnvaseProducto("")
        setCantidad(1)
        setPeriodo("")
        
    }

    const handleOpenCloseModal = () =>{
        setOpen((cur) => !cur);
        setCantidad(1)
        setPrice(0);
        setSelecEnvasePaquete("")
        setSelecEnvaseProducto("")
    }

    return (
        <>
            <div className="sm:w-full md:w-full lg:w-full">
                <div className="p-10 space-x-10 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6">
                    {
                    displayData.map((item,index) => (
                            <Card 
                                key={index} 
                                className="shadow-md shadow-blue-gray-100 rounded-xl hover:scale-110 
                                transition-transform duration-300 transform-gpu cursor-pointer"
                                onClick={() => (handleVistaPrevia(item.id, item.name, item.litros,item.description, 
                                item.prices, item.price, item.categorie,item.imagenes,item.mensual,item.trimestral))}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 
                            image-container cursor-pointer"  
                           >
                                <Image key={index} src={item.imagen} alt={"Imagen"} width={1000} height={1000} className="md:h-full md:w-full object-cover object-center "/>
                                
                            </div>
                            <div className="mt-4 text-sm text-gray-700 text-center">
                                {
                                item.name
                            }</div>
                            <div className="mt-1 text-lg font-medium text-gray-900 text-center mb-5">
                                {
                                `$ ${item.price}`
                            }</div>
                            </Card>
                        ))
                } </div>
                <div className="mt-4 mb-10 flex justify-center">
                    <div className="h-5 flex items-center my-auto">
                        <FontAwesomeIcon icon={faAngleLeft} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                            className="h-full cursor-pointer"/>
                    </div>
                    {
                        Array.from({length: totalPages}, (_, index) => (
                            <div key={index}
                                onClick={() => goToPage(index + 1)
                                }
                                className={
                                    `mx-2 text-xl cursor-pointer ${
                                        currentPage === index + 1 ? "bg-[#69b259] hover:bg-[#69b259] bg-opacity-50 rounded-md px-3 py-1" : "bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1"
                                    }`
                                }>{index + 1} </div>
                    ))
                    }
                    <div className="h-5 flex items-center my-auto">
                        <FontAwesomeIcon icon={faAngleRight}
                            onClick={
                                () => goToPage(currentPage + 1)
                            }
                            disabled={
                                currentPage === totalPages
                            }
                            className="cursor-pointer h-full"/>
                    </div>
                </div>
            </div>

            {
                open && (
                    <Dialog size="lg"
                        open={open}
                        handler={handleOpenCloseModal}
                        className="z-50">
                        
                        <DialogBody className="p-0 rounded">
                        
                            <div className="flex justify-end mr-4 mt-4">
                                <FontAwesomeIcon icon={faXmark} size="xl" className="cursor-pointer" onClick={handleOpenCloseModal}/>
                            </div>
                            {
                                notificacion && <Alert color="green" className="text-center"><div className="text-center w-full">Producto agregado, revisa tu carrito</div></Alert>
                            }
                            <div className="md:h-full md:flex items-center mt-0 h-[90vh] overflow-y-auto">
                                
                                
                                    
                                <div className="md:w-[50%] lg:w-[50%] ">
                                    <Carousel className="md:w-full" prevArrow={({ handlePrev }) => (
                                        
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
                                    {
                                        products.cantidadImagenes?.map((item,index) => (
                                        <Image key={index} src={item} width={500} height={500} alt={"imagen"} 
                                        className="h-full w-full object-cover p-10"/>
                                        ))
                                    }
                                    </Carousel> 
                                </div>
                                
                                

                                <div className="md:h-[90vh] lg:w-[50%] p-4">
                                    <div className="text-2xl">
                                        {products.name}
                                    </div>
                                    <div className="text-xl">
                                       
                                        <div className="text-xl">
                                            {
                                                precio ? ( precio > 0 ? `$ ${precio}` : `$ ${products.price_original}`): "$ 0"
                                            }
                                            
                                        </div>

                                    </div>
                                    <div className="">
                                        <div className="p-2">
                                           {
                                            products.categorie !== "envase" && products.categorie !== "paquetes" ?
                                            <Typography color="gray" className="font-medium mb-2">
                                                Tamaño
                                            </Typography>: <></>
                                           }
                                            {
                                                products.categorie !== "paquetes" && products.categorie !== "envase" ?
                                                (
                                                <Select label="Elegir" onChange={handleSelectOption}>
                                                    {
                                                        products.litros.map((item,index)=> (
                                                            <Option key={index} value={item}>{item}</Option>
                                                        ))
                                                    }
                                                    
                                                </Select> )
                                                : <></>
                                            }
                                            {
                                                products.categorie !== "envase" ? <Typography color="gray" className="font-medium mt-2 mb-2">
                                                Selecciona tu Envase
                                            </Typography>: <></>
                                            }
                                            {
                                               products.categorie == "paquetes" ? 
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
                                                </Select> : products.categorie !== "envase" ?
                                                <Select label="Elegir" onChange={handleSelectEnvaseProduct}>
                                                    <Option value="masEnvase">+ Envase</Option>
                                                    <Option value="conEnvase">Ya tengo mi envase GreenKarma</Option>
                                                </Select>: <></>
                                                
                                            }
                                            
                                        </div>
                                        <div className="w-full p-2">
                                            
                                            {
                                                
                                                products.id == 1 ? <></> : <>
                                                    <Typography color="gray" className="font-medium mt-2 mb-2">
                                                        Cantidad
                                                    </Typography>
                                                    <CounterNumber contador={cantidad} setCount={setCantidad} categorie={products.categorie}></CounterNumber>
                                                </> 
                                            }
                                        </div>

                                        {/* Section date */}
                                        <div>
                                            {
                                                products.categorie !== "envase" ? 
                                                <>
                                                    <List>
                                                    {
                                                        options?.map((option,index) => (
                                                            
                                                            <ListItem 
                                                            key={option.id}
                                                            className="transition-all hover:scale-105 hover:before:opacity-0 
                                                            border border-gray-300 mt-2 z-10"
                                                            onClick={()=> handleClickOption(option.id)}>
                                                            <Checkbox 
                                                                checked={option.checked}
                                                                label={
                                                                    <div className="w-full">
                                                                        {option.name}
                                                                    </div>
                                                                }
                                                                containerProps={{
                                                                    className: "-mt-1",
                                                                }}
                                                                className="rounded-full"
                                                                id={option.id}
                                                                key={index}
                                                            />
                                                            </ListItem>
                                                            
                                                        ))
                                                    }
                                                    </List>
                                                    <div className="px-2 mt-4 transition-all">
                                                        {options.find(option => option.id === 2)?.checked ? (
                                                            <Select placeholder="Selecciconar Compra" label="Selección de Compra" 
                                                            onChange={handlePeriodo}>
                                                                <Option value="Mensual">Mensual</Option>
                                                                <Option value="Trimestral">Trimestral</Option>
                                                            </Select>
                                                        ) : null}
                                                    </div>
                                                </> : <></>
                                            }
                                           
                                        </div>
                                        
                                        {/* Button Carrito */}
                                        <div className="text-center mt-5 w-full px-2 mb-10">
                                        
                                            {
                                                products.categorie == "paquetes" ? 
                                                    <Button className={`text-center text-white w-full p-3 
                                                        rounded-lg bg-[#003c25] hover:bg-green-700 
                                                        focus:outline-none focus:border-green-500`}
                                                        onClick={handleSubmit}
                                                        disabled={selectEnvasePaquete == "" || check == "" ? true : false}>
                                                    Agregar al carrito
                                                    </Button> : products.categorie == "envase" ?  <Button className={`text-center text-white w-full p-3 
                                                        rounded-lg bg-[#003c25] hover:bg-green-700 
                                                        focus:outline-none focus:border-green-500`}
                                                        onClick={handleSubmit}
                                                        >
                                                    Agregar al carrito
                                                    </Button> : <Button className={`text-center text-white w-full p-3 
                                                        rounded-lg bg-[#003c25] hover:bg-green-700 
                                                        focus:outline-none focus:border-green-500`}
                                                        onClick={handleSubmit}
                                                        disabled={ selectEnvaseProducto == "" || selectOption == "" || check == "" ? true : false}>
                                                    Agregar al carrito
                                                    </Button>
                          
                                            }
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </DialogBody>
                    </Dialog>
                )
            } 
        </>
    )
}
