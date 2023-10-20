import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Slider,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
function Icon({ id, open }) {
    const [icon, setIcon] = useState(faPlus)
    if (id === open) {
        return (
            <FontAwesomeIcon icon={faMinus} stroke="currentColor" strokeWidth={2}  className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}/>
        )
    }else{
        return (
            <FontAwesomeIcon icon={faPlus} stroke="currentColor" strokeWidth={2}  className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}/>
        )
    }
}

 
export function FilterCategory({setProductos, productos,data}) {
  const [open, setOpen] = React.useState(0);

  const [litros, setLitros] = useState([
    {id: "950ml", checked: false, label: "950ml"},
    {id: "3.78L", checked: false, label: "3.78L"},
    {id: "5L", checked: false, label: "5L"},
    {id: "10L", checked: false, label: "10L"}
    
  ])
  const [categorias,setCategorias] = useState([
    {id: "todas", checked: false, label: "Todas"},
    {id: "cocina", checked: false, label: "Cocina"},
    {id: "autos", checked: false, label: "Autos"},
    {id: "hogar", checked: false, label: "Hogar"},
    {id: "ropa", checked: false, label: "Ropa"},
  ])
  const [precios,setPrecios] = useState([
    {id: "mayorprecio", checked: false, label: "Mayor Precio"},
    {id: "menorprecio", checked: false, label: "Menor Precio"},
  ])
  


  const handleOpen = (item) => setOpen(open === item ? 0 : item);

  const handleFilters = () => {
    // Establece el valor `checked` en false para todos los elementos
    setCategorias((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: false
      }))
    );
    setLitros((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: false
      }))
    );
    setPrecios((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: false
      }))
    );
    setProductos(data)
    
  }

  const handleClickCategoria = (id) =>{
    setCategorias((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
        )
    );
  }

  useEffect(()=>{
    const categoria = categorias.find((categoria) => categoria.checked);
    if (categoria) {
        if (categoria.id == "todas") {
            setProductos(data)
        }else{
            const filterCategorie = data.filter((producto) => {
                // Filtrar por categoría (ropa, cocina, hogar)
                return categoria.id.includes(producto.categorie);
            })
            setProductos(filterCategorie)
        }
    }else{
        setProductos(data)
    }
  },[categorias])

  const handleClickLitros = (id) =>{
    setLitros((prevCheckboxes) =>
    prevCheckboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
    )
    );
  }
  useEffect(()=>{
    const litro = litros.find((item) => item.checked);
    if (litro) {
        const filterLitro = data.filter((item) => (item.litros.includes(litro.id)))
        setProductos(filterLitro)
    }else{
        setProductos(data)
    }
  },[litros])

  const handleClickPrecios = (id) =>{
    setPrecios((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
        )
        );
    }

    useEffect(()=>{
        const precio = precios.find((item) => item.checked)
        if (precio) {
            // console.log(precio);
            if (precio.id == "mayorprecio") {
                 // Ordenar por price de mayor a menor
                const productosMayor = data.slice().sort((a, b) => b.price - a.price); 
                setProductos(productosMayor)
            }
            if (precio.id == "menorprecio") {
                 // Ordenar por price de menor a mayor
                const productosMenor= data.slice().sort((a, b) => a.price - b.price);
                setProductos(productosMenor)
            }
        }
       
    },[precios])
 
  return (
    <>
        <div className="">
            
            <Accordion  open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader className="text-md border-none" onClick={() => handleOpen(1)}>Categoria</AccordionHeader>
                <AccordionBody>
                    <List key={"list-3"}>
                        {
                            categorias.map(item => (
                                <ListItem key={item.id} className="p-0" onClick={()=>handleClickCategoria(item.id)}>
                                    <label
                                    htmlFor={item.id}
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                    >
                                        <ListItemPrefix key={`cats-${item.id}`} className="mr-3">
                                            <Checkbox
                                            id={item.id}
                                            checked={item.checked}
                                            ripple={false}
                                            className="hover:before:opacity-0"
                                            containerProps={{
                                                className: "p-0",
                                            }}
                                            />
                                        </ListItemPrefix>
                                        <Typography key={`labcats-${item.id}`} color="blue-gray" className="font-medium">
                                            {item.label}
                                        </Typography>
                                    </label>
                                </ListItem>
                            ))

                        }

                    </List>
                </AccordionBody>
            </Accordion>
            <Accordion  open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader className="text-md border-none" onClick={() => handleOpen(2)}>
                Precio
                </AccordionHeader>
                <AccordionBody>
                    <List key={"list-3"}>
                        {
                            precios.map(item => (
                                <ListItem key={item.id} className="p-0" onClick={()=>handleClickPrecios(item.id)}>
                                    <label
                                    htmlFor={item.id}
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                    >
                                    <ListItemPrefix key={`lit-${item.id}`} className="mr-3">
                                        <Checkbox
                                        id={item.id}
                                        ripple={false}
                                        checked={item.checked}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                            className: "p-0",
                                        }}
                                        />
                                    </ListItemPrefix>
                                    <Typography key={`lab-${item.id}`} color="blue-gray" className="font-medium">
                                        {item.label}
                                    </Typography>
                                    </label>
                                </ListItem>
                            ))
                        }
                        
                    </List>
                </AccordionBody>
            </Accordion>
            <Accordion  open={open === 4} icon={<Icon id={4} open={open} />}>
                <AccordionHeader className="text-md border-none" onClick={() => handleOpen(4)}>
                Tamaño
                </AccordionHeader>
                <AccordionBody>
                    <List key={"list-2"}>
                        {
                            litros.map(item => (
                                <ListItem key={item.id} className="p-0"  onClick={()=>handleClickLitros(item.id)}>
                                    <label
                                    htmlFor={item.id}
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                    >
                                    <ListItemPrefix key={`prefix-${item.id}`} className="mr-3">
                                        <Checkbox
                                        id={item.id}
                                        ripple={false}
                                        checked={item.checked}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                            className: "p-0",
                                        }}
                                        />
                                    </ListItemPrefix>
                                    <Typography key={`label-${item.id}`} color="blue-gray" className="font-medium">
                                        {item.label}
                                    </Typography>
                                    </label>
                                </ListItem>
                            ))
                        }
                    </List>
                </AccordionBody>
            </Accordion>
            <Button 
                className={`text-center text-white w-full p-3 mt-5
                rounded-lg bg-[#003c25] hover:bg-green-700 
                focus:outline-none focus:border-green-500`}
                onClick={handleFilters}
               >

                Limpiar Filtros
            </Button>
        </div>

    </>
  );
}