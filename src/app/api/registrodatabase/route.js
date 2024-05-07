import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import { data } from "@/app/data";

export async function POST (){
    try {
        const registros = []
        for (const item of data) {
            const result = await prisma.productos.create({
                data:{
                    status: true,
                    categorie: item.categorie,
                    name: item.name,
                    price: item.price,
                    prices: [item.prices],
                    suscriptions: [item.suscriptions],
                    imagen: item.imageurl_01,
                    imagenes: item.imagenes,
                    litros: item.litros,
                    incluye: item.incluye ? item.incluye : [],
                    description: item.description
                }
            })
            registros.push(result)
        }
        if (registros.length > 0) {
            console.log(registros);
            return NextResponse.json({
                success: true,
                message: 'Productos Registrados',
                pedidos: registros
            }, {status: 200});
                
            
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al registrar productos'
            }, {status: 500});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Error del servidor al registrar productos'
        }, {status: 500});
    }
}