import React from "react";

const RoomInfo = ({ roomData }) => {
  const { title, bathrooms, bedrooms, price, description, host, guest } =
    roomData;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
              text-xl 
              font-semibold 
              flex 
              flex-row 
              items-center
              gap-2
            "
        >
          <div>Hosted by {host.name}</div>

          <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={host.image}
          />
        </div>
        <div
          className="
              flex 
              flex-row 
              items-center 
              gap-4 
              font-light
              text-neutral-500
            "
        >
          <div>{guest} guests</div>
          <div>{bedrooms} rooms</div>
          <div>{bathrooms} bathrooms</div>
        </div>
      </div>

      <hr />
      <div
        className="
        text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
    </div>
  );
};

export default RoomInfo;
