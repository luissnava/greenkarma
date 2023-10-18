import Stripe from "stripe";
import {NextResponse} from "next/server";
export async function POST() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_PRODUCTION)
    let allPrices = [];
    let startingAfter = undefined;
    let hasMore = true;
    while (hasMore) {
        const productos = await stripe.prices.list({limit: 50, starting_after: startingAfter})
        allPrices = allPrices.concat(productos.data);

        if (productos.has_more) {
            startingAfter = productos.data[productos.data.length - 1].id;
        } else {
            hasMore = false;
        }
    }
    // console.log(allPrices);
    return NextResponse.json({status: 200, productos: allPrices, message: "Productos Cargados"})
}
