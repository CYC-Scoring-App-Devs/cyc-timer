import db from "../../utils/db";

const DeleteBoat = async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection("boats").doc(id).delete();
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default DeleteBoat;
