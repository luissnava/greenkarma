import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";


export async function POST(request) {
    let respuesta = {}
    try {
        const data = await request.json()
        const productos = await prisma.carrito.findMany({
            where: {
                user: data.user
            }
        })
        
        if (productos && productos.length > 0) {
            respuesta = {
                success: true,
                message: 'Productos cargados',
                articulos: productos
            }
        } else {
            respuesta = {
                success: false,
                message: 'Sin Productos',
                status: 404
            }
        }
        
    } catch (error) {
        console.error("Ocurrió un error al procesar la solicitud:", error);
        respuesta = {
            success: false,
            message: error
        }
    }
    return NextResponse.json(respuesta)
}
