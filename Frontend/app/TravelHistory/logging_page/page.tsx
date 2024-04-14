"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface Place {
  country: string;
  rating: string;
}

const Page: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([{ country: "", rating: "" }]);
  const [error, setError] = useState<string | null>(null);

  const toggle = () => {
    setIsClicked(!isClicked);
  };

  const handleAddPlace = () => {
    setPlaces([...places, { country: "", rating: "" }]);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Place
  ) => {
    const { value } = event.target;
    const newPlaces = [...places];
    newPlaces[index][field] = value;
    setPlaces(newPlaces);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if any input field is empty
    const emptyFields = places.some(
      (place) => place.country === "" || place.rating === ""
    );
    if (emptyFields) {
      setError("All fields are required.");
    } else {
      setError(null);
      // Proceed with form submission logic
      console.log("Form submitted with data:", places);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="md:w-3/4 w-full mx-auto bg-gray-100 p-4  my-10 rounded-lg mb-4">
        {!isClicked && (
          <div className="flex justify-center">
            <Button
              className="bg-transparent text-gray-500 hover:bg-transparent"
              onClick={toggle}
            >
              <h1 className="font-bold text-xl pb-2">
                + Log your travel History
              </h1>
            </Button>
          </div>
        )}
        {isClicked &&
          places.map((place, index) => (
            <div key={index} className="w-full">
              <div className="flex items-center space-x-3 mx-auto my-3 md:w-3/4">
                <Input
                  className="w-1/2"
                  name="country"
                  placeholder="Country"
                  value={place.country}
                  onChange={(event) =>
                    handleInputChange(index, event, "country")
                  }
                />
                <Input
                  className="w-1/2"
                  name="rating"
                  placeholder="Rating"
                  value={place.rating}
                  onChange={(event) =>
                    handleInputChange(index, event, "rating")
                  }
                />
              </div>
            </div>
          ))}
        {isClicked && (
          <div className="flex justify-center w-full">
            <Button className="my-7" onClick={handleAddPlace}>
              Add Place
            </Button>
          </div>
        )}
      </div>
      {isClicked && (
        <div className="flex justify-center w-full">
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500">{error}</div>}
            <Button className=" my-20" type="submit">
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;