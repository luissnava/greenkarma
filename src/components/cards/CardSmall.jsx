import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

export function CardSmall({data}) {
 

  return (
    <Card className="mt-4 w-full flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <Image src={data.urlImage} alt="detergente_multiusos" width={500} height={500}></Image>
      </CardHeader>
      <CardBody className="w-full">
        <Typography variant="paragraph" color="gray" className="mb-2">
         {data.nameProduct}
        </Typography>
        <Typography>
          {`Tipo: ${data.tipoCompra == "compraUnica" ? "Compra Unica": "Compra Recurrente"}`}
       </Typography>
        <Typography variant="paragraph" color="gray" className="mb-2">
          Precio: ${data.priceProduct}
        </Typography>
       
        <Typography variant="paragraph" color="gray" className="mb-2 font-normal">
          Cantidad: {data.cantidadProduct}
          {/* <CounterNumber key={identify} ids={identify} valor={"carritosmall"} contador={cantidad} setCount={setCantidad} ></CounterNumber> */}
        </Typography>

      </CardBody>
    </Card>
  );
}





