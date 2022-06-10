import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const RaceID = () => {
    const [courseDetails, setCourseDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        axios.get("/api/courses/course-list").then((response) => {
          //get details for id
            const resArray = response.data.filter((course) => course.id === id)
            setCourseDetails(resArray)
            setLoading(false)
        });
      }, [id]);

    return (
        <div className="">
            {loading ? (
                <div className="text-center p-12">
                    <span>Loading...</span>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="pt-6 text-xl font-bold">Course: {courseDetails[0].name}</h1>
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
        </div>
    )
}

export default RaceID