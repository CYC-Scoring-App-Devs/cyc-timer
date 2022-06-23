import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Link from "next/link" 


const Admin = () => {
    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        axios.get("/api/courses/course-list") 
            .then((res) => {
                setCourseList(res.data.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                  }))
            })
        }, [])

  return (
    <div>admin</div>
  )
}

export default Admin