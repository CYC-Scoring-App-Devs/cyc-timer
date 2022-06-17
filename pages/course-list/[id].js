import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const CourseId = ({ courseDetails }) => {

  return (
    {courseDetails} && (
    <div className="min-h-screen">

        <div className="flex flex-col items-center">
          <div className="text-center ">
            <Image
              src="/logo.png"
              width={175}
              height={100}
              alt="cyc logo"
              className=""
            />
            <h1 className="pt-6 text-xl font-bold">
              Course: {courseDetails[0].name}
            </h1>
            <p className="p-2 text-xs">
              Length: ~{courseDetails[0].distance}NM
            </p>
            <ul className="list-disc p-3 border">
              {courseDetails[0].course.map((mark, index) => (
                <li key={index} className="p-2">
                  {mark}
                </li>
              ))}
            </ul>
            {courseDetails[0]?.map && (
              <div className="border">
                <Image
                  src={courseDetails[0].map}
                  width={500}
                  height={500}
                  alt="course image"
                  className=""
                />
              </div>
            )}
          </div>
        </div>
 
      <div className="text-center p-3">
        <button className="bg-transparent hover:bg-primary text-primary hover:text-white py-2 px-4 border border-primary hover:border-transparent">
          <Link href="/course-list">Course List</Link>
        </button>
      </div>
    </div>
    )
  );
};

export async function getStaticPaths() {
  const res = await axios.get("https://cyc-timer.herokuapp.com/api/courses/course-list");
  const paths = res.data.map((course) => ({ params: { id: course.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`https://cyc-timer.herokuapp.com/api/courses/course-list/`);
  const courseDetails = res.data.filter((course) => course.id === params.id);
  return { props: { courseDetails } };
}

export default CourseId;
