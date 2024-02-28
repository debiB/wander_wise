"use client";
import recommended1 from "@/asset/home_page.jpeg";
import recommended2 from '@/asset/home_page_2.jpeg';
import image from "@/asset/undraw_Exploring_re_grb8.png";
import Footer from '@/components/Footer';
import NavBar from "@/components/NavBar";
import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    <div>
      <NavBar/>
      <div className="md:grid md:grid-cols-12 block gap-4 mt-8 items-center w-fill">
        <div className ="col-span-5 ml-16 md:mt-0 mt-20">
          <h1 className="md:text-3xl text-2xl font-bold md:mb-5 ">
            Explore the world with our top travel picks!
          </h1>
          <p className="mt-2 md:text-lg text-small mb-10 md:mr-0 mr-10">
            Unlock hidden gems, discover unforgettable experiences, and plan
            your next adventure with ease.
          </p>
         
           <Link href="/auth/signup"><Button text = "Join Us"/></Link> 
          
          
        </div>
        <div className=" col-span-7 flex justify-end mt-5 mr">
          <Image
          src={image}
          alt = "discovery"
          width={1000}
          height={600}/>
        </div>
      </div>
      <div className="bg-gray-100 py-20">
        <p className="text-center md:text-3xl text-xl font-bold mb-5">Reccomendations based on your past experiences</p>
        <div className="md:flex mt-12 md:mb-0 items-center justify-center ">
         <div className="col-span-4 md:mr-10 md:rounded-full overflow-hidden"> 
         <Image
          src={recommended1}
          alt = "discovery"
          width={600}
          height={600}/>
         
         </div>
          <div className="col-span-4 md:rounded-full overflow-hidden"> 
         <Image
          src={recommended2}
          alt = "discovery"
          width={600}
          height={600} />
         
         </div>
    </div>
    <div className="flex justify-center mt-20">
      <Link href="/auth/signin"><Button text = "Explore More" width="9/12"/></Link>
    </div>
    
    </div>
    <Footer/>
    </div>
  );

}