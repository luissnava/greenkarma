"use client";
import {SessionProvider} from 'next-auth/react'
import StateCompo from './context/StateCompo';
import {NavbarSimple} from '@/components/Navbar';
import Chat from '@/components/whats'
import Footer from '@/components/Footer'
import { useState } from 'react';
function getPage() {
  if (typeof window !== 'undefined') {
    // Solo se ejecutará en el cliente
    return window.location.pathname;
  }
  return 0; // O un valor predeterminado si window no está disponible
}
export const Providers = ({children}) => {
  const [page,setPage] = useState(getPage())
    return (
      <SessionProvider>

        <StateCompo>
          <NavbarSimple overlay={false}></NavbarSimple>
          {children}
          <Chat></Chat>
          <Footer></Footer>
        </StateCompo>

      </SessionProvider>
    )
}
