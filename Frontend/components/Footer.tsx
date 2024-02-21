import React from 'react'

const Footer = () => {
  return (
    <div className = "bg-button_c text-white py-10">
        <div>
            
        </div>
      <div className = " bg-button_c flex justify-between items-center mt-10">
        <div className="bg-button_c text-xl font-bold ml-10">Wander Wise</div>
        <ul className="flex space-x-20 mr-20">
            <li>About us</li>   
            <li>Contact us</li>
            <li>Log in</li>      
        </ul>
      </div>
      <div className="bg-button_c text-center py-20">
        <p>© 2021 Wander Wise. All rights reserved.</p>
    </div>
    </div>
  )
}

export default Footer
