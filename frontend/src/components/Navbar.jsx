import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>SportEvent</h1>
      <ul className='hidden md:flex'>
        <a href="/" className='p-4 flex justify-center items-center '>Home</a>
        <a href="/Register" className='p-4 flex justify-center items-center '>Register</a>
        <a  href="/Login" className='bg-[#00df9a] w-[100px] rounded-md font-medium my-6 mx-auto py-3 text-black flex justify-center items-center' >Login</a>
       
       
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>SportEvent</h1>
        <li className='p-4'>Home</li>
        <li className='p-4'>Register</li>
        <li className='p-4'>Login</li>
        
      </ul>
    </div>
  );
};

export default Navbar;