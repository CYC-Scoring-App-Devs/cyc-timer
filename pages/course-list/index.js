import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import db from "../../utils/db";

const CourseList = ({ courses, courseCats }) => {
  const [viewCat, setViewCat] = useState("");

  const displayCat = (e) => {
    setViewCat(e.target.id);
  };

  return (
    <div className="">
      <div className="text-center p-3">
        <Image
          src="/logo.png"
          width={175}
          height={100}
          alt="cyc logo"
          className=""
        />
        <h1 className="p-6 text-xl font-bold">CYC Race Courses</h1>
        <ul>
          {courseCats.map((courseCat) => (
            <li key={courseCat.id} className="p-2 underline">
              <button
                id={courseCat.name}
                onClick={displayCat}
                className="bg-transparent rounded hover:bg-primary text-primary hover:text-white py-2 px-4 border border-primary hover:border-transparent min-w-full"
              >
                {courseCat.description}
              </button>
              {viewCat === courseCat.name ? (
                <ul>
                  {courses
                    .filter((course) => course.category === courseCat.name)
                    .map((course) => (
                      <li key={course.id} className="p-2 hover:text-primary">
                        <Link
                          href="/course-list/[id]"
                          as={`/course-list/${course.id}`}
                        >
                          {course.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const coursesRes = await db.collection("courses").get();
  const courses = coursesRes.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  courses.sort((a, b) => a.name.localeCompare(b.name));

  const cats = await db.collection("course-categories").get();
  const courseCats = cats.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  courseCats.sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: { courses, courseCats },
    revalidate: 60,
  };
}

export default CourseList;
