"use client";
import {
    Card,
    Typography,
    List,
    ListItem,
    Avatar,
    Button,
    Dialog,
    DialogBody,
    Stepper,
    Step, 
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft,faXmark} from "@fortawesome/free-solid-svg-icons";
import {signIn,signOut,useSession} from "next-auth/react"
import { useEffect, useState } from "react";
import Orders from "@/components/Pedidos";
export default function User() {
    const {data: session} = useSession()
    const [orders,setOrders] = useState()
    const [option,setOption] = useState("")
    const [lista,setLista] = useState([
        {id: 1, name: "Mis Pedidos", value: "pedidos"},
        // {id: 2, name: "Mis Suscripciones", value: "suscripciones" }
    ])
    const [open, setOpen] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [status,setStatus] = useState("")
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const handleOption = (event) =>{
        console.log(event);
        setOption(event)
    }

    const handleOpenCloseModal = () =>{
        setOpen((cur) => !cur);
    }

    const getPedidos = async() =>{
        if (session) {
            const user = session.user.email
            if (user) {
                const response = await fetch("/api/getPedidos", {
                    method: "POST",
                    body: JSON.stringify({user: user}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()
                        if (data) {
                            const detalles = data.pedidos.map(item => ({
                                id: item.id,
                                user: item.user,
                                status: item.status,
                                productos: item.productos,
                                total: item.total,
                                direction: item.direction,
                                location: item.location,
                                delegation: item.delegation,
                                cp: item.codigopostal,
                                date_start: item.createdAt,
                                udate_date: item.updateAt
                            }))
                            setOrders(detalles)
                        }
                        
                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }
        }else{
            console.log("necesita iniciar sesion");
        }
    }
    
    useEffect(()=>{
        getPedidos();
    },[session])
    
    return (
        <div className="flex w-full">
            <div className="w-[30%] mt-24">
                <Card className="h-[100vh] w-full p-5 shadow-xl">
                    <div className="text-center mt-10 mb-10 relative">
                        {
                            session?.user ? <>
                            <Avatar src={session.user.image} alt="avatar" size="xxl"/>

                            <Typography className="tex-lg text-gray-700 mt-10">{session?.user && session.user.email}</Typography>
                            <Typography color="gray" variant="h3">Login with Google</Typography> 
                            </>: <></>
                        }
                         
                    </div>
                    <List>
                        {
                            lista?.map(item => (
                                <ListItem key={`list-${item.id}`} id={item.value} onClick={()=>handleOption(item.value)}>
                                    {item.name}
                                </ListItem>
                            ))
                        }
                        
                    </List>
                </Card>
            </div>
           
             {/* Pedidos  */}
             <div className="w-full h-[100vh] p-10 shadow-xl mt-24 overflow-y-auto w-full ">

                <hr/>
                <div className="mt-10 text-center w-full">
                <Typography variant="h3">Pedidos</Typography>
                </div>
                <div className="mt-20 p-0 space-x-5 flex flex-wrap ">
                    {
                        option ==  "pedidos" ?
                        
                        (
                            orders?.map(item => (<Orders 
                                key={`order-${item.id}`} 
                                identificador={item.id} 
                                productos={item.productos} 
                                total={item.total}
                                status={item.status}
                                direction={item.direction}
                                setOpen={setOpen}
                                setStatus={setStatus}></Orders> ))
                        )
                        : <></>
                    }
                </div>
            </div>

            {/* {
                open && (
                    <Dialog size="lg"
                        open={open}
                        handler={handleOpenCloseModal}
                        className="z-50">
                        
                        <DialogBody className="p-0 rounded">
                        
                            <div className="flex justify-end mr-4 mt-4">
                                <FontAwesomeIcon icon={faXmark} size="xl" className="cursor-pointer" onClick={handleOpenCloseModal}/>
                            </div>
                            <div className="mt-10 text-center w-full text-xl mb-10">{status == "enProceso" ? "En preparación" : status == "enTransito" ? "En camino" : status == "entregado" ? "Entregado": ""}</div>
                            <div className="w-full py-4 px-8 mb-10">
                                <Stepper
                                    activeStep={status == "enProceso" ? 0 : status == "enTransito" ? 1 : 2}
                                    isLastStep={() => setIsLastStep(true)}
                                    isFirstStep={() => setIsFirstStep(true)}
                                >
                                    <Step>1</Step>
                                    
                                    <Step>2</Step>
                                    
                                    <Step>3</Step>
                                   
                                </Stepper>
                                
                            </div>

                            <div className="text-xl">

                            </div>
                            
                            
                        </DialogBody>
                    </Dialog>
                )
            } */}
            
        </div>
    );
}
