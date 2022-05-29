import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const List = () => {
  const [loading, setLoading] = useState(true);
  const [boatsList, setBoatsList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newBoat, setNewBoat] = useState({});

  const edit = (e) => {
    setEditing(true);
  };

  const addBoat = async (e) => {
    console.log(newBoat);
    setBoatsList([...boatsList, newBoat]);

    axios.post("/api/new-boat", {
      name: newBoat.name,
      rating: newBoat.rating,
      competing: false,
    });
    setNewBoat({});
    setEditing(false);
  };

  const deleteBoat = async (e) => {
    const id = e.target.id;
    const name = boatsList.find((boat) => boat.id === id).name;

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      
      await axios.delete("/api/delete-boat", {
        data: { id },
      });
      setEditing(false);
      //get all boats
      setLoading(true);
      const boats = await axios.get("/api/boatsList");
      setBoatsList(boats.data);
      setLoading(false);
    }
  };

  const handleSave = () => {
    axios.put(`/api/update-boats/`, {
      boatsList,
    });
    setEditing(false);
  };

  useEffect(() => {
    axios.get("/api/boat-list").then((res) => {
      setBoatsList(
        res.data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
      );
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="p-4 text-xl font-bold">Boats List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            {!editing && (
              <>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Rating</th>
              </>
            )}
          </tr>
        </thead>
        {loading && <div>Loading...</div>}
        <tbody>
          {boatsList.map((boat) => (
            <tr key={boat.id} onClick={edit}>
              {!editing && (
                <>
                  <td id={boat.name} className="border px-4 py-2">
                    {boat.name}
                  </td>
                  <td className="border px-4 py-2">{boat.rating}</td>
                </>
              )}
              {editing && (
                <div className="flex border h-full">
                  <p className="flex-1 px-4 py-2">{boat.name}</p>

                  <label
                    className="block p-2 text-sm font-bold mb-2"
                    htmlFor={boat.id}
                  >
                    Rating:{" "}
                  </label>

                  <input
                    id={boat.id}
                    type="text"
                    className="p-2 w-1/4 text-center"
                    onChange={(e) => {
                      setBoatsList(
                        boatsList.map((boat) =>
                          boat.id === e.target.id
                            ? { ...boat, rating: e.target.value }
                            : boat
                        )
                      );
                    }}
                    value={boat.rating}
                  />
                  <button
                    id={boat.id}
                    className="btn btn-error mx-16"
                    onClick={deleteBoat}
                  >
                    delete
                  </button>
                </div>
              )}
            </tr>
          ))}
          <div>
            {editing && (
              <tr>
                <td className="border px-4 py-2">
                  <div className="flex mt-4 justify-between">
                    <label
                      className="block p-2 text-sm font-bold mb-2"
                      htmlFor="newName"
                    >
                      New Boat Name
                    </label>
                    <input
                      type="text"
                      className="p-2 w-1/4 text-center"
                      id="newName"
                      value={newBoat.name}
                      onChange={(e) => {
                        setNewBoat({ ...newBoat, name: e.target.value });
                      }}
                    />
                    {/* <label
                      className="block p-2 text-sm font-bold mb-2"
                      htmlFor="newRating"
                    >
                      New Boat Rating
                    </label>
                    <input
                      type="text"
                      className="p-2 w-1/4 text-center"
                      id="newRating"
                      value={newBoat.rating}
                      onChange={(e) => {
                        setNewBoat({ ...newBoat, rating: e.target.value });
                      }}
                    /> */}
                    <button className="p-2 m-2 btn-success" onClick={addBoat}>
                      {" "}
                      Add{" "}
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </div>
        </tbody>
      </table>
      {editing ? (
        <button className="btn btn-primary m-4" onClick={handleSave}>
          Save
        </button>
      ) : (
        <>
          <button className="btn btn-primary m-4" onClick={edit}>
            Edit
          </button>
          <button className="btn btn-success m-4">
            <Link href="/race">Back to Race</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default List;
