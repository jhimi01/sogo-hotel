import React from "react";
import Header from "../component/Room/Header";
import RoomInfo from "../component/Room/RoomInfo";
import RoomReservation from "../component/Room/RoomReservation";
import { useLoaderData, useParams } from "react-router-dom";

const RoomDetails = () => {
  const roomData = useLoaderData();
  console.log(roomData);
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <Header roomData={roomData}></Header>
        <div className="md:flex items-center justify-between gap-6">
          <div className="w-full md:w-1/2 mx-auto">
            <RoomInfo roomData={roomData}></RoomInfo>
          </div>
          <div className="mx-auto flex flex-col justify-center items-center md:w-1/2 w-full order-first md:order-last">
            <RoomReservation roomData={roomData}></RoomReservation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
