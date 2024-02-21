import recommended1 from "@/asset/home_page.jpeg";
import recommended2 from '@/asset/home_page_2.jpeg';
import image from "@/asset/undraw_Exploring_re_grb8.png";
import Footer from '@/components/Footer';
import NavBar from "@/components/NavBar";
import Button from "@/components/button";
import Image from "next/image";


export default function Home() {
  
  return (
    <div>
      <NavBar/>
      <div className="grid grid-cols-12 gap-4 mt-8 items-center w-fill">
        <div className ="col-span-5 ml-16">
          <h1 className="text-3xl font-bold mb-5">
            Explore the world with our top travel picks!
          </h1>
          <p className="mt-2 text-lg mb-10">
            Unlock hidden gems, discover unforgettable experiences, and plan
            your next adventure with ease.
          </p>
          <Button text = "Join Us"/>
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
        <p className="text-center text-3xl font-bold mb-5">Reccomendations based on your past experiences</p>
        <div className="flex mt-12 items-center justify-center ">
         <div className="col-span-4 mr-10 rounded-full overflow-hidden"> 
         <Image
          src={recommended1}
          alt = "discovery"
          width={600}
          height={600}/>
         </div>
          <div className="col-span-4 rounded-full overflow-hidden"> 
         <Image
          src={recommended2}
          alt = "discovery"
          width={600}
          height={600}/>
         </div>
    </div>
    <div className="flex justify-center mt-20">
      <Button text = "Explore More" width="9/12"/>
    </div>
    
    </div>
    <Footer/>
    </div>
  );

}