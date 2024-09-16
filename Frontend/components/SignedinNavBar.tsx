"use client";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SignedinNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const name = localStorage.getItem("name") ?? ""
  return (
    <div className=" w-full py-10">
      <div className="sticky container  flex justify-between items-center">
        <div className="text-xl font-bold md:ml-0 ml-16">Wander Wise</div>
        <div>
          <Avatar>
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default SignedinNavBar;