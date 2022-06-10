import db from '../../../utils/db';


const index = async (req, res) => {
    try {
      const cats = await db.collection('course-categories').get();
        const courseCats = cats.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        res.json(courseCats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
    export default index;