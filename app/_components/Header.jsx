import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between px-5 items-center shadow-sm'>
      <Link href={'/'}>
        <Image src={'/SimantaLOGO.png'} width={150} height={30}/>
        {/* <h1 className="font-bold text-2xl bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">EduForge AI</h1> */}
        </Link>
        <Link href={'/dashboard'}>
          <Button>Get Started</Button>
        </Link>
    </div>
  )
}

export default Header