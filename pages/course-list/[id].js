import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";


const RaceID = () => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    try {
      axios.get("/api/courses/course-list").then((response) => {
        if (id) {
          const resArray = response.data.filter((course) => course.id === id);
          setCourseDetails(resArray);
          setLoading(false);
          if (resArray.length === 0) {
            setError(true);
          }
        }
      });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }, [id]);

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="text-center p-12">
          <span>Loading...</span>
        </div>
      )}

      {error && (
        <div className="text-center p-12">
          <span>Error...</span>
        </div>
      )}

      {!loading && !error && (
        <div className="text-center">
          <Image src="/logo.png" width={175} height={100} alt="cyc logo" className=""/>
          <h1 className="pt-6 text-xl font-bold">
            Course: {courseDetails[0].name}
          </h1>
          <p className="p-2 text-xs">Length: ~{courseDetails[0].distance}NM</p>
          <ul className="list-disc p-3 border">
            {courseDetails[0].course.map((mark) => (
              <li key={mark} className="p-2">
                {mark}
              </li>
            ))}
          </ul>
        </div>
      )}
    <div className="text-center p-3">
        <button className="bg-transparent hover:bg-primary text-primary hover:text-white py-2 px-4 border border-primary hover:border-transparent">
        <Link href="/course-list">Course List</Link>
        </button>
    </div>
    </div>
  );
};

export default RaceID;
