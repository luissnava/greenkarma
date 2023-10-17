import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";


export async function POST(request) {

    const data = await request.json()
    try {
        const result = await prisma.orders.create({
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
            console.log("orden registrada",result);
            return NextResponse.json({
                success: true,
                message: 'Pedido agregado correctamente',
                data: result
            }, {status: 200});
            
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al agregar la orden'
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



