"use client";
import Button from "./button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link"; 
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" py-4">
      <div className="sticky container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold md:ml-1 ml-16">Wander Wise</div>
        <div className="hidden md:flex items-center space-x-10">
          {" "}
          {/* Added 'hidden' class for mobile */}
          <ul className="flex space-x-10">
            <li className="cursor-pointer"><a className="bg-hover-blue hover:text-blue-500">About us</a></li>{" "}
            {/* Added 'cursor-pointer' class for better UX */}
            <li className="cursor-pointer"><a className="bg-hover-blue hover:text-blue-500">Contact us</a></li>{" "}
            {/* Added 'cursor-pointer' class for better UX */}
          </ul>
          <div className="flex space-x-10">
            <Link href="/auth/signin"><Button text="Log in" width="4/12" /></Link>
           <Link href="/auth/signup"><Button text="Sign up" width="4/12" /></Link> 
          </div>
        </div>
        <div className="md:hidden flex items-center mr-5">
          <button onClick={toggle}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white z-50 fixed top-0 left-0 w-full`}
      >
        <div className="flex flex-col items-center py-8">
          <button onClick={toggle} className="mb-4">
            <X size={30} />
          </button>
          <ul className="block">
            <li className="cursor-pointer mb-5"><a className="bg-hover-blue hover:text-blue-500">About us</a></li>{" "}
            {/* Added 'cursor-pointer' class for better UX */}
            <li className="cursor-pointer mb-5"><a className="bg-hover-blue hover:text-blue-500">Contact us</a></li>{" "}
            {/* Added 'cursor-pointer' class for better UX */}
          </ul>
          <div className="block">
            <div className="mb-5">

            <Button text="Log in" width="4/12" />
            </div>
            <div >

            <Button text="Sign up" width="4/12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
