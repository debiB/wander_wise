"use client";

import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" w-full py-10">
      <div className="sticky container  flex justify-between items-center">
        <div className="text-xl font-bold md:ml-0 ml-16">Wander Wise</div>
        <div className="hidden md:flex items-center space-x-14">
          {" "}
          
          <ul className="flex space-x-14">
            <li className="cursor-pointer">
              <a className="bg-hover-blue hover:text-blue-500">About us</a>
            </li>{" "}
           
            <li className="cursor-pointer">
              <a className="bg-hover-blue hover:text-blue-500">Contact us</a>
            </li>{" "}
            
          </ul>
          <div className="flex space-x-14">
            <Link href="/auth/signin">
              <Button>Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign up</Button>
            </Link>
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
            <li className="cursor-pointer mb-5">
              <a className="bg-hover-blue hover:text-blue-500">About us</a>
            </li>{" "}
            
            <li className="cursor-pointer mb-5">
              <a className="bg-hover-blue hover:text-blue-500">Contact us</a>
            </li>{" "}
           
          </ul>
          <div className="block">
            <div className="mb-5">
              <Link href="/auth/signin">
                <Button>Log in</Button>
              </Link>
            </div>
            <div>
              <Link href="/auth/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
