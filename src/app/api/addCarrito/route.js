import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

// Agrega productos al carrito
export async function POST(request) {
    let nuevoProducto = null
    const data = await request.json()
    // console.log("datos que llegan desde el frontend", data);
    // Consulta la información actual del carrito
    const carrito = await prisma.carrito.findUnique({
        where: {
            user: data.userId
        }
    });
    if (carrito && carrito.id) {
        if (data.local && data.local == "local") {
            nuevoProducto = [
                ... carrito.products,
                ... data.productos
            ]
        } else {
            nuevoProducto = [
                ... carrito.products,
                data.productos
            ]
        }

        const result = await prisma.carrito.update({
            where: {
                user: data.userId
            },
            data: {
                products: nuevoProducto
            }
        })

        if (result) {
            console.log("Producto agregado - >", result);
            return NextResponse.json({
                success: true,
                message: 'Producto agregado correctamente',
                data: result
            }, {status: 200});
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al agregar el producto'
            }, {status: 400});
        }

    } else {
        const result = await prisma.carrito.create({
            data: {
                user: data.userId,
                products: [data.productos]
            }
        })
        if (result) {
            console.log("Producto agregado ->", result);
            return NextResponse.json({
                success: true,
                message: 'Producto agregado correctamente',
                data: result
            }, {status: 200});
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al agregar el producto'
            }, {status: 500});
        }
    }

}
