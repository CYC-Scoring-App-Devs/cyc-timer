import db from '../../../utils/db';


const index = async (req, res) => {
    try {
      const courses = await db.collection('courses').get();
        const courseList = courses.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        res.json(courseList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
    export default index;