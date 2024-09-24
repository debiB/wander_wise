"use client";

import SignedinNavBar from "@/components/SignedinNavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useFetchHotelMutation } from "@/store/TravelHistory/travelHistoryApi";
import { HotelSearchRequest, HotelResponse } from "@/types/travelHistory/types";
import Image from 'next/image';
// Ensure this import aligns with your component structure
import React, { useState } from "react";


const Page = () => {
  const [searchParams, setSearchParams] = useState({
    check_in_date: "2024-09-25",
    check_out_date: "2024-09-26",
    adults: "",
    children: "",
    children_ages: "",
    sort_by: "3",
    min_price: "",
    max_price: "",
    rating: "",
    special_offers: false,
    vacation_rentals: false,
    bedrooms: "",
    bathrooms: "",
  });

  const [fetchHotel, { data: hotelData, isLoading, isError }] =
    useFetchHotelMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const { checked } = e.target;
      setSearchParams((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setSearchParams((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCustomChange = (name: string, value: string) => {
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSpecialOffersChange = () => {
    setSearchParams((prevState) => ({
      ...prevState,
      special_offers: !prevState.special_offers,
      vacation_rentals: prevState.special_offers
        ? prevState.vacation_rentals
        : false,
    }));
  };

  const handleVacationRentalsChange = () => {
    if (searchParams.special_offers) {
      alert("Vacation rentals cannot be enabled when special offers are on.");
      return;
    }
    setSearchParams((prevState) => ({
      ...prevState,
      vacation_rentals: !prevState.vacation_rentals,
    }));
  };

  const handleSearch = () => {
    const searchRequest: HotelSearchRequest = {
      check_in_date: searchParams.check_in_date,
      check_out_date: searchParams.check_out_date,
      adults: searchParams.adults,
      children: searchParams.children,
      children_ages: searchParams.children_ages,
      sort_by: searchParams.sort_by,
      min_price: searchParams.min_price,
      max_price: searchParams.max_price,
      rating: searchParams.rating,
      special_offers: searchParams.special_offers,
      vacation_rentals: searchParams.vacation_rentals,
      bedrooms: searchParams.bedrooms,
      bathrooms: searchParams.bathrooms,
    };

    fetchHotel(searchRequest)
      .unwrap()
      .then((hotelResponse: HotelResponse) => {
        console.log("Fetched hotels:", hotelResponse.hotels);
      })
      .catch((fetchError: any) => {
        console.error("Error fetching hotels:", fetchError);
      });
  };

  return (
    <div className="mx-8">
      <SignedinNavBar />
      <div className="mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Hotel Search</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Check-in Date</Label>
            <Input
              className="py-2 px-3 text-sm"
              type="date"
              name="check_in_date"
              value={searchParams.check_in_date}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Check-out Date</Label>
            <Input
              className="py-2 px-3 text-sm"
              type="date"
              name="check_out_date"
              value={searchParams.check_out_date}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Adults</Label>
            <Input
              className="py-2 px-3 text-sm"
              type="number"
              name="adults"
              placeholder="Adults"
              value={searchParams.adults}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Children</Label>
            <Input
              className="py-2 px-3 text-sm"
              type="number"
              name="children"
              placeholder="Children"
              value={searchParams.children}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Children Ages</Label>
            <Input
              className="py-2 px-3 text-sm"
              type="text"
              name="children_ages"
              placeholder="Children Ages (comma separated)"
              value={searchParams.children_ages}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Sort By</Label>
            <Select
              name="sort_by"
              value={searchParams.sort_by}
              onValueChange={(value) => handleCustomChange("sort_by", value)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Lowest Price</SelectItem>
                <SelectItem value="8">Highest Rating</SelectItem>
                <SelectItem value="13">Most Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Min Price</Label>
            <Input
              className="py-2 px-3 text-sm"
              type="number"
              name="min_price"
              placeholder="Min Price"
              value={searchParams.min_price}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Max Price</Label>
            <Input
              className="py-2 px-3 text-sm"
              type="number"
              name="max_price"
              placeholder="Max Price"
              value={searchParams.max_price}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <Label className="block mb-3 ml-1">Rating</Label>
            <Select
              name="rating"
              value={searchParams.rating}
              onValueChange={(value) => handleCustomChange("rating", value)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">3.5+</SelectItem>
                <SelectItem value="8">4.0+</SelectItem>
                <SelectItem value="9">4.5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <Label className="mr-2">Special Offers</Label>
          <Switch
            checked={searchParams.special_offers}
            onCheckedChange={handleSpecialOffersChange}
          />
        </div>

        <div className="flex items-center mt-4">
          <Label className="mr-2">Vacation Rentals</Label>
          <Switch
            checked={searchParams.vacation_rentals}
            onCheckedChange={handleVacationRentalsChange}
          />
        </div>

        {searchParams.vacation_rentals && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <Label className="block mb-3 ml-1">Bedrooms</Label>
              <Input
                className="py-2 px-3 text-sm"
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={searchParams.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <Label className="block mb-3 ml-1">Bathrooms</Label>
              <Input
                className="py-2 px-3 text-sm"
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={searchParams.bathrooms}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <Button className="mt-6 w-full" onClick={handleSearch}>
          Search Hotels
        </Button>

        {/* Display hotels */}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching the page</p>}
      {hotelData && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    {hotelData.hotels.map((hotel: any, index: number) => (
      <Card key={index} className="shadow-lg p-4">
        <h3 className="font-bold text-lg">{hotel.name}</h3>
        <p>{hotel.rate_per_night.lowest} per night</p>
        {hotel.location_rating && <p>Location Rating: {hotel.location_rating}</p>}
        {hotel.amenities && <p>Amenities: {hotel.amenities + " "}</p>}
        {hotel.images && hotel.images.length > 0 ? (
          <Image
             src={`/proxyImage?url=${encodeURIComponent(hotel.images[0].thumbnail)}`}
            alt={hotel.name}
            className="w-full h-auto rounded"
            layout="responsive" // You can change layout as needed
            width={500} // Adjust width
            height={300} // Adjust height
          />
        ) : (
          <div className="w-full h-auto rounded bg-gray-200 flex items-center justify-center">
            <span>No image available</span>
          </div>
        )}
      </Card>
    ))}
  </div>
)}
      </div>
    </div>
  );
};

export default Page;