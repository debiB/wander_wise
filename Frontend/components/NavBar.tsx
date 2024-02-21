import Button from "./button";
import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <div className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Wander Wise</div>
        <div className="flex items-center space-x-20">
          <ul className="flex space-x-20">
            <li>About us</li>
            <li>Contact us</li>
          </ul>
          <div className="flex space-x-20">
            <Button text="Log in" width="4/12" />
            <Button text="Sign up" width="4/12"/>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default NavBar;
