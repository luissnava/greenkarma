import React, { useState,useEffect } from 'react'
import { counterContext } from './counterContext'
import {signIn,signOut,useSession} from "next-auth/react"

const StateCompo = ({children}) => {
    const [counter,setCounter] = useState(0)
    const {data: session} = useSession()
    const [message, setMessage] = useState(false)
    const [order,setOrder] = useState(null)

    const handleOrders = (param) =>{
      setOrder(param)
    }
    const mensaje = (valor) =>{
      setMessage(valor)
    }

    const igualar = (number) =>{
        setCounter(prev => prev = number)
    }
    const restar = (number) =>{
      if (counter > 0) {
        setCounter(prev => prev - number)
      }
        
    }
    const reset = () =>{
      setCounter(0)
    }

    const getCarrito = async () => {
        if (session) {
            const user = session.user.email
            if (user) {
              console.log("obteniendo datos");
                const response = await fetch("/api/getCarrito", {
                    method: "POST",
                    body: JSON.stringify({ user }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response) {
                    if (response.ok == true && response.status == 200) {
                        const data = await response.json()
                        // console.log(data);
                        if (data.success == false) {
                          console.log("sin productos en el carrito");
                        }else{
                          const productos = data.articulos.map(item => item.products)
  
                          if (productos[0].length == 0) {
                              reset()
                          }else{
                             igualar(productos[0].length)
                          }
                        }
                       
                    } else {
                        console.log("Error del Servidor");
                    }
                }
            }

        }else{
            const copia = localStorage.getItem('carrito')
            if (copia !== null) {
                const datos = JSON.parse(copia)
                igualar(datos.length)
            }else{
                console.log("Sin productos en el carrito");
                reset()
            }
            
        }
    }

    useEffect(()=>{
      getCarrito()
    },[session])

  
  return (
    <counterContext.Provider value={{counter,message,order,igualar,restar,reset,mensaje,handleOrders}}>
        {children}
    </counterContext.Provider>
  )
}

export default StateCompo
