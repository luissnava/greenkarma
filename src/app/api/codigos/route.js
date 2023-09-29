import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";


export async function POST() {
    let respuesta = {}
    try {
        const codigos = await prisma.codigosPostales.findMany()
        
        if (codigos && codigos.length > 0) {
            respuesta = {
                success: true,
                message: 'Codigos cargados',
                codigospostales: codigos
            }
        } else {
            respuesta = {
                success: false,
                message: 'Sin Codigos'
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
