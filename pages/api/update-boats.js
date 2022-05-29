import db from "../../utils/db";

const UpdateBoats = async (req, res) => {

    const boatsList = req.body.boatsList.map((boat) => {
    return {
      name: boat.name,
      rating: boat.rating,
    };
  });

  const dbBoats = await db.collection('boats').get();
  //update each boat in the database
    boatsList.forEach((boat) => {
    //find boat by name in db
    const dbBoat = dbBoats.docs.find((dbBoat) => {
        return dbBoat.data().name === boat.name;
    });
    //update boat in db
    dbBoat.ref.update({
        name: boat.name,
        rating: boat.rating,
    });

    });
    res.status(200).end();
    };

export default UpdateBoats;
