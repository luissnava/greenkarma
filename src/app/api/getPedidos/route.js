import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";



// Agrega productos al carrito
export async function POST(request) {
    const data = await request.json()
    console.log(data);
    try {
        const result = await prisma.pedidos.findMany({
            where: {
                user: data.user,
                status: "enProceso"
            }
        })
        console.log(result);
        if (result) {
            console.log(result);
            return NextResponse.json({
                success: true,
                message: 'Pedidos encontrados',
                pedidos: result
            }, {status: 200});
                
            
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al obtener el pedido'
            }, {status: 500});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Error del servidor al obtener el pedido'
        }, {status: 500});
    }
  
    
    

}



