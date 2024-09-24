"use client";

import NavBar from "@/components/NavBar";
import SignedinNavBar from "@/components/SignedinNavBar";
import { Button } from "@/components/ui/button";
import { useGetTwoTravelHistoryQuery, useGenerateRecommendationMutation } from "@/store/TravelHistory/travelHistoryApi";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";


const Page = () => {
  const [allowCustomDescription, setAllowCustomDescription] = useState(false);
  const [customDescription, setCustomDescription] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [allowGenerateButton, setAllowGenerateButton] = useState(true);

  const {
    data: travelHistory,
    isLoading,
    error,
  } = useGetTwoTravelHistoryQuery(null);
  const [generateRecommendation] = useGenerateRecommendationMutation(); // Mutation for generating recommendation

  const handleAllowCustomDescriptionChange = () => {
    setAllowCustomDescription(!allowCustomDescription);
    setAllowGenerateButton(!allowGenerateButton);
  };

  const handleGenerateRecommendation = () => {
    setIsGenerating(true);

    generateRecommendation({
      customDescription: allowCustomDescription ? customDescription : undefined,
    })
      .unwrap()
      .then((response) => {
        const newRecommendation = response.reccomendation;
        setRecommendation(newRecommendation);

        // Store recommendation in local storage, overwriting any existing value
        localStorage.setItem("destination", newRecommendation);
      })
      .catch((err) => {
        console.error("Error generating recommendation:", err);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };



  console.log(recommendation);

  return (
    <div>
      <SignedinNavBar />
      <div className="h-screen flex flex-col justify-between mt-10">
        <div className="py-4">
          <div className="mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-4">Your History</h1>
                <Button className="text-blue-500 bg-white hover:bg-white hover:underline">
                  <Link href="/TravelHistory/see-all-destinations">
                    See all
                  </Link>
                </Button>
              </div>

              {/* Travel History Section */}
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error loading travel history</p>
              ) : travelHistory && travelHistory.length > 0 ? (
                <div className="md:flex block align-items-center">
                  {travelHistory.map((destination, index) => (
                    <div
                      key={index}
                      className="md:w-1/2 w-full mr-2 bg-gray-100 p-4 rounded-lg mb-4"
                    >
                      <div>
                        <h1 className="font-bold text-xl pb-2">
                          {destination.name}
                        </h1>
                      </div>
                      <p>Rating: {destination.rating}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-between items-center my-2">
                  <p className="mr-5">
                    No travel history found. Add travel History to get
                    recommendation.
                  </p>
                  <Link href="/TravelHistory/logging_page">
                    <Button>
                      <Plus />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Additional Page Content */}
          <div className="flex md:text-xl font-bold justify-center md:mt-20 mb-4 mt-10">
            Want to know your destination?
          </div>
          <p className="md:text-small flex md:justify-center mx-3 md:mb-20 mb-10">
            Generate your destination now. Either using your travel history or
            describing your preferences.
          </p>

          {/* Generate Recommendation Section */}
          {allowGenerateButton && (
            <div className="fixed bottom-0 left-0 w-full z-50">
              <div className="flex justify-center my-4">
                <Button
                  className="w-4/12"
                  onClick={handleGenerateRecommendation}
                  disabled={isGenerating}
                >
                  {isGenerating
                    ? "Generating..."
                    : "Generate solely Based on your travel history"}
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-center my-8">
            <label
              htmlFor="allowCustomDescription"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="allowCustomDescription"
                className="mr-2"
                onChange={handleAllowCustomDescriptionChange}
              />
              Allow Custom Description
            </label>
          </div>

          {allowCustomDescription && (
            <div className="fixed bottom-0 left-0 w-full z-50">
              <div className="py-4 fixed bottom-0 left-0 w-full z-50">
                <div className="flex max-w-3xl mx-auto px-4">
                  <input
                    type="text"
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mr-2"
                    placeholder="Enter your custom description"
                  />
                  <Button
                    onClick={handleGenerateRecommendation}
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Send"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Display Recommendation */}
          {recommendation && (
            <div>
            <div className="flex justify-center my-4">
              <div className="bg-gray-100 p-4 rounded-lg w-3/4 text-center">
                <p>Recommended Destination: {recommendation}</p>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <Link href="/TravelHistory/hotel-search">
            <Button>Discover Hotels</Button>
              </Link>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;