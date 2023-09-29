import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";
export async function POST(request){
    const data = await request.json();
    // Consulta la información actual del carrito
    const datos = await prisma.carrito.findUnique({
        where: {
            user: data.user
        }
    });
    if (datos && datos.id) { 
        // Encuentra el índice del elemento en la matriz 'products' que coincida con el 'id' y 'urlImage'

        const index = datos.products.findIndex((item) => item.idProduct === data.id && item.urlImage === data.urlImagen);
       
        if (index !== -1) {
            // Elimina el elemento de la matriz 'products'
            datos.products.splice(index, 1);

            try {
                const result = await prisma.carrito.update({
                    where: {
                        user: data.user
                    },
                    data: {
                        products: datos.products
                    }
                });
                if (result) {
                    console.log("Producto eliminado  - >", result);
                    return NextResponse.json({
                        success: true,
                        message: 'ProductoEliminado',
                        data: result.products
                    }, {status: 200});
                } else {
                    return NextResponse.json({
                        success: false,
                        message: 'Error al eliminar el producto'
                    }, {status: 400});
                }
            } catch (error) {
                console.log(error);
                return NextResponse.json({
                    success: false,
                    message: 'Error interno del servidor'
                }, {status: 500});
            }

           
        } 
        else {
            return NextResponse.json({
                success: false,
                message: 'No se encontró un producto con el id y la urlImage proporcionados'
            }, {status: 400});
        }
        

    } else {
        return NextResponse.json({
            success: false,
            message: 'Carrito no encontrado'
        }, {status: 400});
    }
   
}