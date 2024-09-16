"use client";

import NavBar from "@/components/NavBar";
import SignedinNavBar from "@/components/SignedinNavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAddTravelHistoryMutation } from "@/store/TravelHistory/travelHistoryApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Import useRouter

interface Place {
  country: string;
  rating: string;
}

const Page: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([{ country: "", rating: "" }]);
  const [error, setError] = useState<string | null>(null);

  const [addTravelHistory, { isLoading }] = useAddTravelHistoryMutation(); // Hook for the mutation
  const { toast } = useToast(); // Use toast properly
  const router = useRouter(); // Initialize router

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

  // Function to remove a place
  const handleRemovePlace = (index: number) => {
    const newPlaces = places.filter((_, i) => i !== index);
    setPlaces(newPlaces);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emptyFields = places.some(
      (place) => place.country === "" || place.rating === ""
    );
    const invalidRating = places.some(
      (place) => Number(place.rating) < 0 || Number(place.rating) > 5
    );

    if (emptyFields) {
      setError("All fields are required.");
    } else if (invalidRating) {
      setError("Rating must be a number between 0 and 5.");
    } else {
      setError(null);

      // Format the data to match your request structure
      const destination = places.map((place) => ({
        name: place.country,
        rating: place.rating,
      }));

      try {
        // Call the mutation to submit the data
        await addTravelHistory({ destination }).unwrap();
        toast({
          description: "Travel History added successfully!",
        });
        router.push("/TravelHistory/see-all-destinations"); // Navigate on success
      } catch (error) {
        console.error("Submission error:", error);
        toast({
          variant: "destructive",
          description: "Travel History addition failed.",
        });
      }
    }
  };

  return (
    <div>
      <SignedinNavBar />
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
                  type="number"
                  min={0}
                  max={5}
                  name="rating"
                  placeholder="Rating (0-5)"
                  value={place.rating}
                  onChange={(event) =>
                    handleInputChange(index, event, "rating")
                  }
                />
                <Button
                  className="bg-red-500 text-white"
                  onClick={() => handleRemovePlace(index)}
                >
                 -
                </Button>
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
            <Button className="my-20" type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
