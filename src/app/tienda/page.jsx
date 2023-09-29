"use client";
import React, { useState, useEffect } from 'react'
import {FilterCategory} from '@/components/Filter'
import {CardProduct} from '@/components/cards/CardProduct'
const Tienda = () => {
    const [productos,setProductos] = useState(null)
    const [displayData, setDisplayData] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0)
    const [copia,setCopia] = useState(null)

    const getProductos = async () => {
        const lista = []
        const response = await fetch("/api/getProductos", {
            method: "POST",
            body: JSON.stringify({}),
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
                        date_created: item.createdAt,
                        date_updated: item.updateAt
                    }))
                    // lista.push(productos)
                    setProductos(productos)
                    setCopia(productos)
                }

            } else {
                console.log("Error del Servidor");
            }
        }
    }

    useEffect(()=> {
        getProductos();
    },[])

    useEffect(() => {
        if (productos) {
            const totalPaginas = Math.ceil(productos.length / itemsPerPage);
            setTotalPages(totalPaginas)
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const newData = productos.slice(startIndex, endIndex);
            setDisplayData(newData);
        }
    
    }, [currentPage,productos]);

   
    return (
        <div className='border w-full p-0d'>

            <div className="relative h-screen">
                <div className="absolute inset-0 bg-fixed bg-cover bg-center"
                    style={
                        {
                            backgroundImage: "url('bann.png')"
                        }
                }></div>
            </div>
            <div className="text-center flex-row justify-center mt-28 w-full">
                <div className="text-5xl font-bold">Nuestros Productos</div>
                <h1 className="text-2xl text-gray font-bold">¡AHORRA 5%!</h1>
                <h1 className="text-lgtext-gray">COMPRANDO CUALQUIERA DE NUESTROS KITS</h1>
            </div>

            <div className="sm:w-full md:flex mt-24">
                <div className="sm:w-full md:w-[30%] lg:w-[30%] p-16 md:sticky lg:sticky md:top-[30%] overflow-y-auto h-[100vh]">
                    <div className="w-full text-3xl font-weight-thin mb-4">Filtrar por</div>
                    <FilterCategory setProductos={setProductos} productos={productos} data={copia}></FilterCategory>
                </div>
               

                <div className="w-full">
                    <CardProduct displayData={displayData} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}></CardProduct>
                </div>
                
            </div>
        </div>


    )
}

export default Tienda
