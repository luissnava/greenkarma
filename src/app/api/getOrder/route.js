import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";
export async function POST(request) {
    const data = await request.json()
    try {
        const result = await prisma.orders.findMany({
            where: {
                user: data.user,
                status: "enProceso"
            }
        })
        
        if (result) {
            console.log("Orden encontrada ->",result);
            return NextResponse.json({
                success: true,
                message: 'Ordenes encontradas',
                ordenes: result
            }, {status: 200});
                
            
        } else {
            return NextResponse.json({
                success: false,
                message: 'Error al obtener la orden'
            }, {status: 500});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Error del servidor al obtener la orden'
        }, {status: 500});
    }
}