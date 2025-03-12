"use client";
import { db } from '@/configs/db';
import { CourseList, UserCourseCompletions } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq ,and} from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CourseList.id));


    const coursesWithCompletionCount = await Promise.all(
      result.map(async (course) => {   
          const completedChaptersCount = await db.select()
          .from(UserCourseCompletions)
          .where(and(eq(UserCourseCompletions.userId, user.id),
          eq(UserCourseCompletions.isCompleted, true),
          eq(UserCourseCompletions.courseId,course.courseId ),
      
        ))
          .execute();
        return {
          ...course,
          completedChapters: completedChaptersCount.length,
        };
      })
    )
           

    // Update the state with the courses including the completed chapter count
    setCourseList(coursesWithCompletionCount);
    setUserCourseList(coursesWithCompletionCount);
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.length > 0 ? (
          courseList?.map((course, index) => (
            <CourseCard course={course} key={index} refreshData={() => getUserCourses()} />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]"></div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
