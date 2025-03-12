
import { db } from '@/configs/db'
import { Chapters ,UserCourseCompletions} from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditChapters from './EditChapters';
import { useUser } from '@clerk/clerk-react';

function ChapterList({ course, refreshData, edit = true }) {
  const { user } = useUser();
  const [chaptersWithDetails, setChaptersWithDetails] = useState([]);
  useEffect(() => {
    if (course?.courseOutput?.course?.chapters) {
      fetchChapterDetails();
    }
  }, [course]);

  const fetchChapterDetails = async () => {
    // Get chapters from the database associated with courseId
    const result = await db
      .select()
      .from(Chapters)
      .where(eq(Chapters.courseId, course?.courseId));


    const userCompletionResult = await db
      .select()
      .from(UserCourseCompletions)
      .where(eq(UserCourseCompletions.userId, user.id))

    const mergedChapters = course?.courseOutput?.course?.chapters.map((chapter, index) => {
      // Ensure that the additionalDetails exists before trying to access its properties
      const additionalDetails = result.find((ch) => ch.chapterId === index);
    
    
      // If additionalDetails is not found, skip the current iteration or handle it accordingly
      if (!additionalDetails) {
        console.log(`No additional details found for chapter index ${index}`);
        return {
          ...chapter,
          isCompletedVideo: false, // Default to false if no completion data is found
        };
      }
    
      // Find the user's completion status for the current chapter
      const userCompletion = userCompletionResult.find(
        (completion) => completion.chapterId === additionalDetails.id
      );
    
      return {
        ...chapter,
        isCompletedVideo: userCompletion?.isCompleted || false, // Set completion status
      };
    });
    setChaptersWithDetails(mergedChapters);
  };

  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {chaptersWithDetails.map((chapter, index) => (
          <div
            key={chapter.id || index}
            className="border p-5 rounded-lg mb-2 flex items-center justify-between"
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">
                  {chapter?.name}
                  {edit && (
                    <EditChapters
                      course={course}
                      index={index}
                      refreshData={refreshData}
                    />
                  )}
                </h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 text-primary items-center">
                  <HiOutlineClock /> {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle
              className={`text-4xl ${chapter?.isCompletedVideo ? 'text-green-500' : 'text-gray-300'
                } flex-none`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
