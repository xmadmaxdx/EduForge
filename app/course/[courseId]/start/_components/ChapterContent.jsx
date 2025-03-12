import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db';
import { UserCourseCompletions } from '@/configs/schema';
import { eq ,and} from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
};
function ChapterContent({ chapter, content }) {
  const { user } = useUser();
  const completedChapter = async (id) => {
 
    // const result = await db.update(Chapters)
    //   .set({
    //     isCompletedVideo: true,
    //   })
    //   .where(eq(Chapters.id, id));
     // Get current user from Clerk[]

     if (!id) {
      alert("the chapter is missing please go to next chapter")
      return
     }
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    const existingCompletion = await db.select()
    .from(UserCourseCompletions)
    // .where(
    //   eq(UserCourseCompletions.userId, user.id),
    //   eq(UserCourseCompletions.chapterId, id)
    // )
    .where(and(eq(UserCourseCompletions.userId, user.id),
    eq(UserCourseCompletions.chapterId, id),
    eq(UserCourseCompletions.courseId,content?.courseId ),

  ))
    .execute();
  if (existingCompletion.length > 0) {
    // If the record exists, update the completion status
    await db.update(UserCourseCompletions)
    .set({ isCompleted: true })
    .where(and(eq(UserCourseCompletions.userId, user.id),
    eq(UserCourseCompletions.chapterId, id)))
  } else {
    // If the record doesn't exist, insert a new completion record
    await db.insert(UserCourseCompletions).values({
      userId: user.id,
      chapterId: id,
      isCompleted: true,
      courseId : content?.courseId
    });
  }



  }


  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
      <p className='text-gray-500'>{chapter?.about}</p>

      {/* Video  */}
      <div className='flex justify-center my-6'>
        <YouTube
          videoId={content?.videoId}
          opts={opts}
        />
      </div>
      <div className="complete-btn text-end p-5">

        <Button
          disabled={content?.isCompletedVideo === true}
          style={{
            backgroundColor: content?.isCompletedVideo && "gray" ,
            cursor: content?.isCompletedVideo ? "not-allowed" : "pointer",
          }}
          onClick={() => completedChapter(content?.id)}
        >
          {content?.isCompletedVideo ? "Already Completed" : "Complete"}
        </Button>

      </div>


      <div>
        {content?.content?.map((item, index) => (
          <div className='p-5 bg-purple-50 shadow-sm mb-3 rounded-lg'>
            <h2 className='font-medium text-2xl'>{item.title}</h2>
            {/* <p className='whitespace-pre-wrap'>{item?.description}</p> */}
            <ReactMarkdown className='text-lg text-black leading-9'>{item?.description}</ReactMarkdown>
            {item.codeExample &&
              <div className='p-4 bg-black text-white rounded-md mt-3'>
                <pre>
                  <code>{item.codeExample.replace('<precode>', '').replace('</precode>', '')}</code>
                </pre>
              </div>}
          </div>
        ))}
      </div>

      {/* Content  */}
    </div>
  )
}

export default ChapterContent