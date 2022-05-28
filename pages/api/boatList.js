import db from '../../utils/db';


const index = async (req, res) => {
    try {
      const boats = await db.collection('boats').get();
        const boatList = boats.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        res.json(boatList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
    export default index;