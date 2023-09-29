import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Chat = () => {
    return (
        <div className='fixed bottom-0 right-0 p-4'>
            
            <div className="relative w-full flex">
                <Link href={"https://wa.link/5t3ct7"} target='_blank'><Image className='z-50 h-20 w-20' src={"/whatsapp.png"} width={1000} height={1000}></Image></Link>
            </div>
        </div>
    )
}

export default Chat
