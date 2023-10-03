import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST (request){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_PRODUCTION)
    const data = await request.json()
    const sessionCheckout = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types:['card'],
        locale: "es",
        line_items: 
            data.map(item =>(
                {
                    price_data: {
                        currency: "mxn",
                        unit_amount: parseInt(item.priceUnidad * 100),
                        product_data: {
                            name: item.nameProduct,
                            description: item.contentProduct,
    
                        },
                        
                    },
                    quantity: item.cantidadProduct
                }
            )),
        success_url: "https://greenkarma.com.mx/finalizado",
        cancel_url: "https://greenkarma.com.mx/carrito"
    })
    console.log(sessionCheckout);
    return NextResponse.json({
        status: 200,
        url: sessionCheckout.url,
        message: "checkout"
    })
}
