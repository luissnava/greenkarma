import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";


export async function POST(request) {
    let bandera = null;
    const data = await request.json()
    console.log("datos desde frontend ",data.data);
    try {
        for(const item of data.data){
            
            const result = await prisma.pedidos.create({
            data: {
                user: item.user,
                phone: item.phone,
                productos: item.productos,
                total: item.total,
                status: "enProceso",
                direction: item.direction,
                location: item.location,
                delegation: item.delegation,
                codigopostal: item.codigopostal
            }})

            if (result) {
                console.log("Pedido Registrado", result);
                const orders = await prisma.orders.delete({
                    where: {
                        id: item.id
                    }
                })
                if (orders) {
                    console.log("Orden eliminada ->", orders);
                    const eliminados = await prisma.carrito.update({
                        where: {
                            user: item.user
                        },
                        data: {
                            products: []
                        }
                    });
                    if (eliminados) {
                        bandera = eliminados;
                        console.log("Pedido agregado correctamente");
    
                    }else{
                        console.log("Error al vaciar el carrito");
                    }
    
                } else {
                    console.log("Error al eliminar la orden");
                }
    
            } else {
                console.log("error al agregar el pedido");
            }
        }

        if (bandera !== null) {
            return NextResponse.json({
                success: true,
                message: 'Pedido agregado correctamente',
            }, {status: 200});
        }
       
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Error del servidor al agregar el pedido'
        }, {status: 500});
    }


}
