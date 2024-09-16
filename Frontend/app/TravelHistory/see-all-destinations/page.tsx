"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllTravelHistoryQuery } from "@/store/TravelHistory/travelHistoryApi";
import { Destination } from "@/types/travelHistory/types";
// Ensure these types are exported
import { Star } from "lucide-react";
import { Search } from "lucide-react";
import React, { useState } from "react";


// Define component
const Page: React.FC = () => {
  const [data, setData] = useState<Destination[]>([]); // State to store the array of destinations
  const {
    data: destinationData,
    refetch,
    error,
    isFetching,
  } = useGetAllTravelHistoryQuery(null); 
console.log(destinationData);

  return (
    <div>
      <div className="flex justify-center my-20">
        <div className="flex md:w-1/2 w-full mx-4 md:mx-0 items-center space-x-2">
          <Input placeholder="Search..." />
          <Button>
            <Search />
          </Button>
        </div>
      </div>

      {isFetching ? (
        <p>Loading...</p> 
      ) : error ? (
        <p>Error fetching data</p> 
      ) : (
        destinationData && destinationData.map((destination) => (
          <div
            key={destination.name}
            className="md:flex block align-items-center mx-4 md:mx-0 justify-center"
          >
            <div className="md:w-1/2 w-full md:ml-2 ml-0 bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex items-baseline justify-between">
                <h1 className="font-bold text-xl pb-2">{destination.name}</h1>
                <div className="flex space-x-2">
                  <Star size={20} />
                  <p>{destination.rating}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;