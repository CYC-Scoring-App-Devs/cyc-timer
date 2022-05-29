import db from '../../utils/db';

const NewBoat = async (req, res) => {
    try {
      const { name } = req.body;
      const boats = await db.collection('boats').get();
      const boatsList = boats.docs.map(boat => boat.data());
  
      if (boatsList.some(boat => boat.name === name)) {
        res.status(400).end();
      } else {
        const { id } = await db.collection('boats').add({
            name: name,
            competing: false,
            rating: null,
        });
        res.status(200).json({ id });
      }
    } catch (e) {
      res.status(400).end();
    }
  }

    export default NewBoat;