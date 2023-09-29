import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

// Agrega productos al carrito
export async function POST() {
    // const data = await request.json()
    try {
        const result = await prisma.productos.findMany({
            where: {
                status: true
            }
        })
        if (result) {
            console.log(result);
            return NextResponse.json({
                success: true,
                message: 'Productos Obtenidos',
                productos: result
            }, {status: 200});
                
            
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al obtener los productos'
            }, {status: 500});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Error del servidor al obtener los productos'
        }, {status: 500});
    }
  
    
    

}



