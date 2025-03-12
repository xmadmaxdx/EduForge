import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center px-5 py-3 shadow-sm text-xl font-bold'>
       <Link href={'/dashboard'}>
       {/* <p className='font-bold text-2xl bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent'>EduForge AI</p> */}
       <Image src={'/SimantaLOGO.png'} width={125} height={30}/>
        </Link>
        <UserButton/>
    </div>
  )
}

export default Header