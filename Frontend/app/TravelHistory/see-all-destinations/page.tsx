import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import React from "react";
import { Search } from "lucide-react";

interface PlaceRating {
  place: string;
  rating: number;
}

const mockData: PlaceRating[] = [
  { place: "New York City", rating: 4.5 },
  { place: "Paris", rating: 4.8 },
  { place: "Tokyo", rating: 4.7 },
  { place: "London", rating: 4.6 },
  { place: "Rome", rating: 4.4 },
    { place: "Dubai", rating: 4.3 },
    { place: "Sydney", rating: 4.2 },
    { place: "Barcelona", rating: 4.1 },
    { place: "Istanbul", rating: 4.0 },
    { place: "Amsterdam", rating: 3.9 },
];



const Page = () => {
return (
    <div>
        <div className="flex justify-center my-20">
        <div className="flex md:w-1/2 w-full mx-4 md:mx-0  items-center space-x-2">
      <Input placeholder="Search..." />
      <Button><Search/></Button>
    </div>
        </div>
         {mockData.map((place) => (
            <div className="md:flex block align-items-center mx-4 md:mx-0 justify-center">
            <div className="md:w-1/2 w-full md:ml-2 ml-0 bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex items-baseline justify-between">
                    <h1 className="font-bold text-xl pb-2">{place.place}</h1>
                    <div className="flex space-x-2">
                        <Star size={20} />
                <p>{place.rating}</p>
                        </div>
                </div>
            </div>
            </div>
        ))}
    </div>
)
}

export default Page