import { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
    
  const [boatsList, setBoatsList] = useState([]);

  useEffect(() => {
    axios.get('/api/boatList').then(res => {
      setBoatsList(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Boats</h1>
      {boatsList.map(boat => (
          <div key={boat.id} className="border">
            <h2>Name: {boat.name}</h2>
            <p>Rating: {boat.rating}</p>
        </div>
        ))}
    </div>
  );
};

export default List;