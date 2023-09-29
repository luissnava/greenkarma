import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";


export async function POST(request) {
    
    const data = await request.json()
    const result = await prisma.carrito.create({
        data: {
            userId: data.userId,
            products: data.productos,
            tipo_compra: "compra"
        }
    })
    return NextResponse.json(result)
}
