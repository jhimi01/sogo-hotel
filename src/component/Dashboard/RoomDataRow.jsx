import { format } from "date-fns";
import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import { deleteRoom } from "../../api/rooms";
import { toast } from "react-hot-toast";
import UpdateModal from "../Modal/UpdateModal";

const RoomDataRow = ({ room, fetchRooms, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditModal, setIsEditModal] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  const modalHandler = (id) => {
    deleteRoom(id).then((data) => {
      console.log(data);
      toast.success("booking cancelled");
      fetchRooms();
    });
    closeModal();
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={room?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={room._id}
        ></DeleteModal>
      </td>

      {/* update room info modal */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModal(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdateModal
          isOpen={isEditModal}
          setIsEditModal={setIsEditModal}
          refetch={refetch}
          room={room}
          id={room._id}
        ></UpdateModal>
      </td>
    </tr>
  );
};

export default RoomDataRow;
