"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Page = () => {
  const [allowCustomDescription, setAllowCustomDescription] = useState(false);
  const [allowGenerateButton, setAllowGenerateButton] = useState(true);

  const handleAllowCustomDescriptionChange = () => {
    setAllowCustomDescription(!allowCustomDescription);
    setAllowGenerateButton(!allowGenerateButton);
  };

  return (
    <div>
      <NavBar />
      <div className="h-screen flex flex-col justify-between mt-10">
        <div className="py-4">
          <div className="mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-xl font-bold mb-4">Your History</h1>
              <div className="md:flex block align-items-center">
                <div className="md:w-1/2 w-full mr-2 bg-gray-100 p-4 rounded-lg mb-4">
                  <div>
                    <h1 className="font-bold text-xl pb-2">Egypt</h1>
                  </div>
                  <p>Egypt is a nice place</p>
                </div>
                <div className="md:w-1/2 w-full md:ml-2 ml-0 bg-gray-100 p-4 rounded-lg mb-4">
                  <div>
                    <h1 className="font-bold text-xl pb-2">Egypt</h1>
                  </div>
                  <p>Egypt is a nice place</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:text-xl font-bold justify-center md:mt-20 mb-4 mt-10">
            {" "}
            Want Know your destination?
          </div>
          <p className="md:text-small flex md:justify-center mx-3 md:mb-20 mb-10 ">
            {" "}
            Generate your destination now. Either using your travel history or
            describing your preferences.
          </p>
          {allowGenerateButton && (
            <div className="fixed bottom-0 left-0 w-full z-50">
              <div className="flex justify-center my-4">
                <Button className="w-4/12">
                  Generate solely Based on your travel history
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
                // checked={allowCustomDescription}
                onChange={handleAllowCustomDescriptionChange}
              />
              Allow Custom Description
            </label>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        {allowCustomDescription && (
          <div className="py-4 fixed bottom-0 left-0 w-full z-50">
            <div className="flex max-w-3xl mx-auto px-4">
              <input
                type="text"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mr-2"
                placeholder="Enter your text here"
              />
              <Button>Send</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
