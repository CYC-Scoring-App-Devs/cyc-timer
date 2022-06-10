import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const CourseList = () => {
  const [courseCats, setCourseCats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCat, setViewCat] = useState("");

  useEffect(() => {
    axios.get("/api/courses/course-cats").then((response) => {
      const resArray = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCourseCats(resArray);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/courses/course-list").then((response) => {
      const resArray = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCourses(resArray);
    });
  }, []);

  const displayCat = (e) => {
    setViewCat(e.target.id);
  }

  return (
    <div className="">
      {loading ? (
        <div className="text-center p-12">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="text-center p-3">
          <Image src="/logo.png" width={175} height={100} alt="cyc logo" className=""/>
          <h1 className="p-6 text-xl font-bold">CYC Race Courses</h1>
          <ul>
            {courseCats.map((courseCat) => (
              <li
                key={courseCat.id}
                className="p-2 underline"
              >
                <button id={courseCat.name} onClick={displayCat} className="bg-transparent rounded hover:bg-primary text-primary hover:text-white py-2 px-4 border border-primary hover:border-transparent">
                  {courseCat.description}
                </button>
                { viewCat === courseCat.name ? (
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
      )}
    </div>
  );
};

export default CourseList;
