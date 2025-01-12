import { useContext, useEffect, useState } from "react";
import { getRoomsHost } from "../../api/rooms";
import { AuthContext } from "../../providers/AuthProvider";
import RoomDataRow from "../../component/Dashboard/RoomDataRow";
import EmptyState from "../../component/shared/EmptyState";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyListings = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: listings = [], refetch } = useQuery({
    queryKey: ["rooms", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rooms/${user?.email}`);
      console.log("res from axios", res.data);
      return res.data;
    },
  });

  return (
    <>
      {listings && Array.isArray(listings) && listings.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Delete
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings &&
                      listings.map((listing) => (
                        <RoomDataRow
                          key={listing._id}
                          room={listing}
                          refetch={refetch}
                        ></RoomDataRow>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          message={"No Listings data found yet"}
          label={"Browsrooms"}
          address={"/"}
        />
      )}
    </>
  );
};

export default MyListings;
