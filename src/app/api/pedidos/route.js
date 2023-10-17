import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";


export async function POST(request) {
    const data = await request.json()
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
                codigopostal: data.codigopostal
            }
        })
        if (result) {
            console.log("Pedido Registrado", result);
            const orders = await prisma.orders.delete({
                where: {
                    id: data.id
                }
            })
            if (orders) {
                console.log("Orden eliminada ->", orders);
                const eliminados = await prisma.carrito.update({
                    where: {
                        user: data.user
                    },
                    data: {
                        products: []
                    }
                });
                if (eliminados) {
                    return NextResponse.json({
                        success: true,
                        message: 'Pedido agregado correctamente',
                        data: result
                    }, {status: 200});

                }else{
                    console.log("Error al vaciar el carrito");
                }

            } else {
                console.log("Error al eliminar la orden");
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
