import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";



export async function POST(request) {
    const data = await request.json()
    console.log(data);
    try {
        const result = await prisma.pedidos.create({
            data: {
                user: data.user,
                phone: data.phone,
                productos: data.productos,
                total: data.total,
                status: "enProceso",
                direction: data.direction,
                location: data.location,
                delegation: data.delegation,
                codigopostal: data.cp
            }
        })
        if (result) {
            console.log(result);
            const eliminados = await prisma.carrito.update({
                where: {
                    user: data.user
                },
                data: {
                    products: []
                }
            });
            console.log(eliminados);
            if (eliminados) {
                console.log("Pedido agregado ->",result);
                return NextResponse.json({
                    success: true,
                    message: 'Pedido agregado correctamente',
                    data: result
                }, {status: 200});
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al agregar el pedido'
            }, {status: 500});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Error del servidor al agregar el pedido'
        }, {status: 500});
    }
  
    
    

}



