"use client"
import { Progress } from '@/components/ui/progress';
import Image from 'next/image'
import { useClerk } from '@clerk/nextjs'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { HiOutlineHome,HiOutlineSquare3Stack3D,HiOutlineShieldCheck,HiOutlinePower } from "react-icons/hi2";
;
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function SideBar() {
    const { signOut } = useClerk()
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext);
    const Menu=[
        {
            id:1,
            name:'Home',
            icon:<HiOutlineHome />,
            path:'/dashboard'
        },
        {
            id:1,
            name:'Explore',
            icon:<HiOutlineSquare3Stack3D />,
            path:'/dashboard/explore'
        }
        // {
        //     id:1,
        //     name:'Upgrade',
        //     icon:<HiOutlineShieldCheck />,
        //     path:'/dashboard/upgrade'
        // }
    ]
    const path=usePathname();
  return (
    <div className='fixed h-full md:w-64 px-5 py-2 shadow-md'>
       {/* <h1 className='font-bold text-2xl bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent'>EduForge AI</h1> */}
       <Image src={'/SimantaLOGO.png'} width={125} height={20}/>

        <hr className='mt-3 mb-5' />

        <ul>
            {Menu.map((item,index)=>(
                <Link href={item.path}>
                    <div className={`flex items-center gap-2 text-gray-600
                    p-3 cursor-pointer hover:bg-gray-100
                    hover:text-black rounded-lg mb-3
                    ${item.path==path&&'bg-gray-100 text-black'}`}> 
                        <div className='text-2xl'>{item.icon}</div>
                        <h2>{item.name}</h2>
                    </div>
                </Link>
            ))}
            <span className='text-gray-600 flex items-center gap-2
                    p-3 cursor-pointer hover:bg-gray-100
                    hover:text-black rounded-lg mb-3' onClick={() => signOut({ redirectUrl: '/' })}>
                        <HiOutlinePower size={22}/>
                        Sign out</span>
        </ul>

        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={(userCourseList?.length/5)*100} />
            <h2 className='text-sm my-2'>{userCourseList?.length} Out of 5 Course created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimted course generate</h2>

        </div>
    </div>
  )
}

export default SideBar