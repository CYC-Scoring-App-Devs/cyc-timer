import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const boatsList = [
  {
    name: "Boat 1",
    competing: false,
    finishTime: null,
    rating: 100,
  },
  {
    name: "Boat 2",
    competing: false,
    finishTime: null,
    rating: 50,
  },
  {
    name: "Boat 3",
    competing: false,
    finishTime: null,
    rating: 200,
  },
  {
    name: "Boat 4",
    competing: false,
    finishTime: null,
    rating: 102,
  },
  {
    name: "Boat 5",
    competing: false,
    finishTime: null,
    rating: 75,
  },
];

const Race = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [startTime, setStartTime] = useState(null);
  const [startTimeString, setStartTimeString] = useState(
    "Click below to Mark Start Time"
  );

  const [boatsListState, setBoatsListState] = useState(boatsList);

  const handleStartTime = () => {
    const date = new Date();
    setStartTime(date);
    setStartTimeString(
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
  };

  const handleFinishTime = (e) => {
    const finishTime = new Date();
    
    const updatedBoatsList = boatsListState.map((boat) => {
      if (boat.name === boatsListState[e.target.id].name) {
        return {
          ...boat,
          finishTime: finishTime.toLocaleTimeString(),
        };
      } else {
        return boat;
      }
    }
    );
    setBoatsListState(updatedBoatsList);
  };

  const handleNewBoat = (e) => {
   const name = document.getElementById("newBoatName").value;
   if (name === "") {
    document.getElementById("my-drawer").checked = false;
     return;
   }
   setBoatsListState([...boatsListState, { name: name, competing: true, finishTime: null, rating: null }]);
   document.getElementById("newBoatName").value = "";
   document.getElementById("my-drawer").checked = false;
}

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const date = new Date();
    setStartTime(date.setHours(18, 35, 0));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CYC Race Timer</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="border text-center w-full">
            <div className="pt-2 text-center">
              <h2 className="pt-2">Current Time:</h2>
              <h3 className="text-yellow-500 text-xl">
                {currentTime.toLocaleTimeString()}
              </h3>
            </div>
            <div className="pt-2 text-center">
              <h2 className="pt-2">Race Start Time:</h2>
              <h3 className="pb-2 text-green-400 text-xl">{startTimeString}</h3>
              <button
                className="btn btn-secondary bg-green-400 border-green-600 mb-4"
                onClick={handleStartTime}
              >
                Mark Start Time
              </button>
            </div>
            <label htmlFor="my-drawer" className="btn btn-error drawer-button ">
              Select Competing Boats
            </label>
          </div>
          <div className="mt-4 w-full border min-h-16">
            <h2 className="text-lg">Competing Boats:</h2>
     
            {boatsListState.map((boat, index) => {
              if (boat.competing) {
                return (
                  <div className="flex md:flex-row w-full p-2" key={index}>
                    <div className="flex md:flex-row justify-between w-full items-center border">
                      <h3 className="text-lg">{boat.name}</h3>
                      <p className="text-green-400">Finish time: {boat.finishTime}</p>
                      <button className="btn btn-sm md:btn-md btn-error bg-red-400 border-red-600" id={index} onClick={handleFinishTime}>Mark Finish Time</button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {boatsListState.map((boat, index) => (
              <div key={index} className="flex flex-row w-full">
              <li className="border-b py-4 w-full">
                <label htmlFor={`checkbox-${index}`} className="">
                  {boat.name} - Racing: {" "}
                </label>
                <input
                  type="checkbox"
                  className="checkbox mx-8 p-4"
                  id={`${index}`}
                  checked={boat.competing}
                  onChange={(e) => {
                    setBoatsListState(
                      boatsListState.map((boat, index) =>
                        index === Number(e.target.id)
                          ? { ...boat, competing: !boat.competing }
                          : boat
                      )
                    );
                  }}
                />
              </li>
            </div>
            ))}
            <label htmlFor="newBoat" className="">
              Add Boat
            </label>
            <input type="text" id="newBoatName" className="p-4" onKeyDown={ e.key === 'enter' ? handleNewBoat : null }/>
            <button className="btn btn-secondary bg-green-400 border-green-900 my-4" onClick={handleNewBoat}>Add to Race</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Race;
