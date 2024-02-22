import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className="bg-button_c text-white py-10">
  <div className="bg-button_c block md:flex md:justify-between items-center mt-10">
    <div className="bg-button_c text-xl font-bold ml-10">Wander Wise</div>
    <ul className="md:flex md:space-x-20 md:mr-20 md:mx-0 mx-auto">
      <li className="md:inline-block md:my-0 my-5 md:ml-0 ml-10 bg-hover-blue hover:text-blue-500">About us</li>
      <li className="md:inline-block md:mb-0 mb-5 md:ml-0 ml-10 bg-hover-blue hover:text-blue-500">Contact us</li>
     <Link href ="/auth/signin"><li className="md:inline-block md:mb-0 mb-5 md:ml-0 ml-10 bg-hover-blue hover:text-blue-500">Log in</li></Link> 
    </ul>
  </div>
  <div className="bg-button_c md:text-center ml-10 md:ml-0 py-20">
    <p>© 2021 Wander Wise. All rights reserved.</p>
  </div>
</div>
  )
}

export default Footer
