"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faXmark, faLock } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react"
import { useCallback, useEffect, useState, useContext } from "react";
import CheckoutForm from "../pedido/page";
import { Button } from "@material-tailwind/react";
import { counterContext } from '@/app/context/counterContext';
const Carrito = () => {
    const [carrito, setCarrito] = useState()
    const [message, setMessage] = useState(false)
    const [cantidades, setCantidades] = useState()
    const [total, setTotal] = useState(0)
    const [open,setOpen] = useState(false)
    const { data: session } = useSession()
    const {restar} = useContext(counterContext)
    const [size,setSize] = useState(null)

    const pantalla = () =>{
        const anchoPantalla = window.innerWidth;
        setSize(anchoPantalla)
        console.log(anchoPantalla);
    }

    const getCarrito = async () => {
        if (session) {
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/getCarrito", {
                    method: "POST",
                    body: JSON.stringify({ user }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                if (data.success == true) {
                    
                    const productos = data.articulos.map(item => item.products)

                    if (productos[0].length !== 0) {
                        setMessage(false)
                        const lista = productos[0].map(item => item.cantidadProduct)
                        const cantProducto = lista.reduce((total, numero) => {
                            // Utiliza parseFloat para convertir una cadena en un número decimal
                            const numeroDecimal = parseInt(numero);
                            
                            // Verifica si el valor es un número válido antes de sumarlo
                            if (!isNaN(numeroDecimal)) {
                                return total + numeroDecimal;
                            }
                            
                            return total;
                        }, 0);
                        setCantidades(parseInt(cantProducto))
                        
                        data.message == "Sin Productos" ? setMessage(mensaje) : setCarrito(productos[0])
                        
                    }else{
                        setMessage(true)
                    }
                    
                } else {
                    console.log("Error del Servidor");
                }
                
            }

        }
    }
    
    const updateData = async (id,urlImagen,cantidad,precioProduct) => {
        if (session) {
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/updateCarrito", {
                    method: "POST",
                    body: JSON.stringify({user,id,urlImagen,cantidad,precioProduct}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const datos = await response.json()
                        console.log("producto actualizado");
                        // console.log("productos actualizados",datos.data);
                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
        }
    }

    const deleteData = async(id,urlImagen,cantidad,precioProduct) =>{
        if (session) {
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/deleteCarrito", {
                    method: "POST",
                    body: JSON.stringify({user,id,urlImagen,cantidad,precioProduct}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const datos = await response.json()
                        console.log("productos eliminados");
                        setCarrito(datos.data)
                        restar(1)
                        if (datos.data.length == 0) {
                            setMessage(true)
                        }
                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
        }else{
            const datos = localStorage.getItem("carrito")
            const articulos = JSON.parse(datos)
            const nuevos_datos = articulos.filter(item => item.idProduct !== id && item.urlImage !== urlImagen)
            if (nuevos_datos.length == 0) {
                setMessage(true)
            }
            setCarrito(nuevos_datos)
            restar(1)
            localStorage.setItem("carrito",JSON.stringify(nuevos_datos))
        }
    }

    const increment = (urlImage) => {
        let maximo = 0;
        // Clona el arreglo productosCarrito
        const newProductosCarrito = [...carrito];

        // Encuentra el índice del elemento con la URL proporcionada
        const index = newProductosCarrito.findIndex((producto) => producto.urlImage === urlImage);

        // Si se encontró el elemento con la URL proporcionada
        if (index !== -1) {
            // Modifica la cantidadProduct del elemento encontrado, por ejemplo, aumenta en 1
            if (newProductosCarrito[index].categorie == "paquetes") {
                maximo = 3;
            }else{
                maximo = 10;
            }
            if (newProductosCarrito[index].cantidadProduct < maximo) {
                newProductosCarrito[index].cantidadProduct += 1;
                // Calcula el nuevo total para el producto
                const id = newProductosCarrito[index].idProduct
                const cantidad = newProductosCarrito[index].cantidadProduct;
                const precioUnidad = parseFloat(newProductosCarrito[index].priceUnidad);
                const nuevoTotal = precioUnidad * cantidad;

                // Almacena el nuevo total en el atributo priceUnidad del producto
                newProductosCarrito[index].priceProduct = parseFloat(nuevoTotal).toFixed(2);


                // Actualiza el estado productosCarrito con el nuevo arreglo modificado
                setCarrito(newProductosCarrito);

                updateData(id,urlImage,cantidad,nuevoTotal)
            }

        }
    };

    const decrement = (urlImage) => {
        // Clona el arreglo productosCarrito
        const newProductosCarrito = [...carrito];

        // Encuentra el índice del elemento con la URL proporcionada
        const index = newProductosCarrito.findIndex((producto) => producto.urlImage === urlImage);

        // Si se encontró el elemento con la URL proporcionada
        if (index !== -1) {
            
            if (newProductosCarrito[index].cantidadProduct > 1) {
                // Modifica la cantidadProduct del elemento encontrado, por ejemplo, aumenta en 1
                newProductosCarrito[index].cantidadProduct -= 1;
                // Calcula el nuevo total para el producto
                const id = newProductosCarrito[index].idProduct
                const cantidad = newProductosCarrito[index].cantidadProduct;
                const precioUnidad = parseFloat(newProductosCarrito[index].priceUnidad);
                const nuevoTotal = precioUnidad * cantidad;

                // Almacena el nuevo total en el atributo priceUnidad del producto
                newProductosCarrito[index].priceProduct = parseFloat(nuevoTotal).toFixed(2);


                // Actualiza el estado productosCarrito con el nuevo arreglo modificado
                setCarrito(newProductosCarrito);

                updateData(id,urlImage,cantidad,nuevoTotal)
            }

        }

    }

    const totalCarrito = () =>{
        const productos = [...carrito]
        const subtotales = productos.map(item => item.priceProduct)
        const lista = productos.map(item => item.cantidadProduct)

        const subtotal = subtotales.reduce((total, numero) => {
            const numeroDecimal = parseFloat(numero);
            // Verifica si el valor es un número válido antes de sumarlo
            if (!isNaN(numeroDecimal)) {
              return total + numeroDecimal;
            }
            
            return total;
        }, 0); 

        const cantProducto = lista.reduce((total, numero) => {
            const numeroEntero = parseInt(numero);
            if (!isNaN(numeroEntero)) {
              return total + numeroEntero;
            }
            
            return total;
        }, 0);
        setCantidades(parseInt(cantProducto))
        setTotal(parseFloat(subtotal).toFixed(2))
    }

    const addCarritoPublico = async(userId,productos) =>{
        const local = "local";
        const response = await fetch("/api/addCarrito", {
            method: "POST",
            body: JSON.stringify({userId,productos,local}),
            headers: {
            'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
            if (data.success == true) {
                localStorage.clear()
                getCarrito()
            }
        
    }

    const handleOpenCloseModal = async() =>{
        if (session) {
            setOpen((cur) => !cur);
        }else{
            await signIn({
                redirect: true
            })
        }
        
    }

    useEffect(() => {
        if (session) {
            const datos = localStorage.getItem("carrito")
            const articulos = JSON.parse(datos)
            if (articulos) {
                addCarritoPublico(session.user.email,articulos)
            }else{
                getCarrito()
            }
            
        }else{
            const datos = localStorage.getItem("carrito")
            const articulos = JSON.parse(datos)
            if (articulos) {
                if (articulos.length == 0) {
                    setMessage(true)
                }else{
                    const lista = articulos.map(item => item.cantidadProduct)
                    const cantProducto = lista.reduce((total, numero) => {
                        // Utiliza parseFloat para convertir una cadena en un número decimal
                        const numeroDecimal = parseInt(numero);
                        
                        // Verifica si el valor es un número válido antes de sumarlo
                        if (!isNaN(numeroDecimal)) {
                        return total + numeroDecimal;
                        }
                        
                        return total;
                    }, 0);
                    setCantidades(parseInt(cantProducto))
                    setCarrito(articulos)
                }
            }
            else{
                setMessage(true)
            }           
        }
        
    }, [session])
    
    useEffect(()=>{
        if (carrito) {
            if (carrito.length > 0) {
                totalCarrito()
            }
        }
        
    },[carrito])

    useEffect(()=>{
        pantalla()
        window.addEventListener("resize",pantalla)
        return () => {
            window.removeEventListener("resize", pantalla);
          };
    },[])
    
    return (
        <>
            <div className="w-[80%] m-auto">
                <div className="">
                    <h1 className=" mb-10 text-center text-2xl font-bold">Mi carrito</h1>
                </div>

                <div className="pt-20 d:flex sm:block lg:flex carrito-responsive">

                    <div className=" w-full justify-center px-6 overflow-y-auto h-[70vh]">
                        {/* Prodcutos  */}
                        {
                            carrito && carrito?.map((item, index) => (
                                <div key={`contenedor-${index}`} className="rounded-lg">
                                    <div className="md:justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-center p-0">
                                    {
                                        size < 540 ? <div className="flex items-center justify-end ">

                                        <FontAwesomeIcon key={`icono-${index}`} size="xl" icon={faXmark} className="cursor-pointer" onClick={()=>deleteData(item.idProduct,item.urlImage,item.cantidadProduct,item.priceProduct)}></FontAwesomeIcon>

                                        </div> : <></>
                                        }
                                        <Image src={item.urlImage}
                                            key={index}
                                            width={1000}
                                            height={1000}
                                            alt="product-image"
                                            className="w-full rounded-lg sm:w-32 h-full" />
                                            
                                        <div className="sm:ml-4 sm:block sm:w-full sm:justify-center md:flex p-0 card-responsive">
                                        {
                                        size < 840 && size > 540 ? <div className="flex items-center justify-end ">

                                        <FontAwesomeIcon key={`icono-${index}`} size="xl" icon={faXmark} className="cursor-pointer" onClick={()=>deleteData(item.idProduct,item.urlImage,item.cantidadProduct,item.priceProduct)}></FontAwesomeIcon>

                                        </div> : <></>
                                        }
                                            <div className="mt-5 sm:mt-0 w-full">
                                                <h2 className="sm:text-md md:text-xl font-bold text-gray-900">{item.nameProduct}</h2>
                                                <div className="mt-1 text-md sm:text-sm md:text-md text-gray-700">Precio Unidad:<strong> $ {item.priceUnidad}</strong></div>
                                               
                                               {
                                                item.idProduct == 1 ? <></> :
                                                <>
                                                    <div className="mt-1 text-md sm:text-sm md:text-md text-gray-700">Tamaño: <strong>{item.sizeProduct}</strong></div>
                                                <div className="mt-1 text-md sm:text-sm md:text-md text-gray-700">Selecciona tu Envase: <strong>{item.contentProduct == "conEnvase" ? "Con Envae" : "+ Envase"}</strong></div>
                                                 <div className="mt-1 text-md sm:text-sm md:text-md text-gray-700">Tipo de compra: <strong>{item.tipoCompra == "compraUnica" ? "Compra Unica" : "Compra Recurrente"}</strong></div>
                                                </>
                                               }
                                                {
                                                    item.periodoSuscription == "" || item.idProduct == 1 ? <></> :  <div className="mt-1 text-md text-gray-700">Periodicidad: <strong>{item.periodoSuscription}</strong></div>
                                                }
                                                 <div className="flex justify-start w-[40%] mt-2">
                                                    <div className={`flex flex-row h-8  rounded-lg relative bg-transparent mt-1`} id={index}>
                                                        {
                                                            item.priceUnidad == 0 ? <>
                                                                
                                                            </>: <>
                                                            <button data-action="decrement" onClick={() => decrement(item.urlImage)} className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                                            <span className="m-auto text-2xl font-thin">−</span>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className="outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                                                            name="custom-input-number"
                                                            value={[item.cantidadProduct]}
                                                            id={`counter${index}`}
                                                            readOnly
                                                        />
                                                        <button data-action="increment" onClick={() => increment(item.urlImage)} className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                                            <span className="m-auto text-2xl font-thin">+</span>
                                                        </button>
                                                            </>
                                                        }
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="sm:block block mt-4 flex md:flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

                                               
                                                <div className="flex mt-5 md:justify-end sm:justify-start sm:mt-5 md:mt-0 lg:mt-0 items-center">
                                                    <div className="text-2xl">{item.priceProduct > 0 ? `$${item.priceProduct}` : "0.00"}</div>
                                                </div>
                                                {
                                                    size > 840 ? <div className="items-start flex justify-end">

                                                    <FontAwesomeIcon key={`icono-${index}`} size="xl" icon={faXmark} className="cursor-pointer" onClick={()=>deleteData(item.idProduct,item.urlImage,item.cantidadProduct,item.priceProduct)}></FontAwesomeIcon>

                                                </div> : <></>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            message && <>
                                <div className="font-bold text-2xl text-black text-center">Carrito Vacio</div>
                                <div className="flex items-center justify-center w-full">
                                    <Link className={`text-center text-white p-3 mt-10 
                                rounded-lg bg-[#003c25] hover:bg-green-700 
                                focus:outline-none focus:border-green-500`}
                                        href={"/tienda"} key={"linkagregar"}>
                                        Agregar Productos
                                    </Link>
                                </div>
                            </>
                        }


                    </div>
                    {/* Subtotal  */}
                    {
                        !message && <div className="w-full mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 carta-responsive">
                            <div className="mb-10 flex justify-center">
                                <p className="text-gray-700 text-xl">Resumen del pedido</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Productos</p>
                                <p className="text-gray-700">{cantidades}</p>
                            </div>
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700">
                                    {total}
                                </p>
                            </div>
                            
                            <hr className="my-5" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">
                                        {total} MXN
                                    </p>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-center">
                                <Button
                                key={'botonfinalizarcomrpa'}
                                className="mt-6 text-sm bg-[#003c25]
                                    hover:bg-green-700 focus:outline-none
                                    rounded-lg focus:border-green-500 p-3 text-white text-center" 
                                    onClick={handleOpenCloseModal}>
                                    Finalizar Compra
                                </Button>
                            </div>
                            <div className="mt-4 flex justify-center space-x-4">
                                <FontAwesomeIcon key={"iconpagoseguro"} size="sm" icon={faLock} ></FontAwesomeIcon>
                                <p className="text-sm text-gray-700">Pago Seguro</p>
                            </div>
                        </div>
                    }
                    

                </div>

                {
                    open && <CheckoutForm open={open} setOpen={setOpen} carrito={carrito} totalPedido={total}></CheckoutForm>
                }
            </div>
        </>
    )
}

export default Carrito
