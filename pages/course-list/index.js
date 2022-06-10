import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseList = () => {
  const [courseCats, setCourseCats] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/courses/course-cats").then((response) => {
      const resArray = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCourseCats(resArray);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/courses/course-list").then((response) => {
      const resArray = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCourses(resArray);
    }
    );
  }, []);

    return (
        <div className="">
            <h1>Course Categories</h1>
            <ul>
                {courseCats.map((courseCat) => (
                    <li key={courseCat.id}>
                        <a href={`/course-list/${courseCat.name}`}>{courseCat.description}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
