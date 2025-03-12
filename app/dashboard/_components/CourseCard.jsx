import Image from 'next/image'
import React from 'react'
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';


function CourseCard({course,refreshData,displayUser=false}) {

    const getTotalCompletedChapterPerc=(item)=>{
        let totalCompletedChapter = item?.completedChapters
        let totalChapter = item?.courseOutput?.course?.chapters?.length || 0;
        let perc = totalChapter == 0 ? 0 : (totalCompletedChapter / totalChapter) * 100;

            return perc.toFixed(0)
        }

    const handleOnDelete=async()=>{
        const resp=await db.delete(CourseList)
        .where(eq(CourseList.id,course?.id))
        .returning({id:CourseList?.id})
        
        if(resp)
        {
            refreshData()
        }
    }

  return (
    <div className='shadow-sm rounded-lg border p-2
     cursor-pointer mt-4 hover:border-primary'>
        <Link href={'/course/'+course?.courseId}>
            <Image src={course?.courseBanner} width={300} height={200}
            className='w-full h-[200px] object-cover rounded-lg'
            />
        </Link>
        <div className='p-2'>
            <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.course?.name}
            
           {!displayUser&& <DropdownOption
            handleOnDelete={()=>handleOnDelete()}
            ><HiMiniEllipsisVertical/></DropdownOption>}
            </h2>
            
            <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
            <div className='flex items-center justify-between mb-2'>
                <h2 className='flex gap-2 items-center
                 p-1 bg-purple-50 text-primary text-sm rounded-sm'>
                    <HiOutlineBookOpen/>{course?.courseOutput?.course?.numberOfChapters} Chapters</h2>
                <h2 className='text-sm bg-purple-50 text-primary p-1 rounded-sm'>{course?.level}</h2>
            </div>
                <Progress value={getTotalCompletedChapterPerc(course)} className="h-[7px]" />
          {displayUser&&  <div className='flex gap-2 items-center mt-2'>
                <Image src={course?.userProfileImage} width={35} height={35}
                className='rounded-full'
                />
                <h2 className='text-sm'>{course?.userName}</h2>
            </div>}
        </div>
    </div>
  )
}

export default CourseCard