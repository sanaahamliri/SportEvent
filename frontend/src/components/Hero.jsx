import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['events', 'registrations', 'participants'],
      typeSpeed: 40,
      backSpeed: 50,
      loop: true,
    };

    if (typedElement.current) {
      const typed = new Typed(typedElement.current, options);
      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>STREAMLINE SPORTS MANAGEMENT
        </p>
        
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
          Flexible financing for</p>
          <span
            ref={typedElement}
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>
        Organize events, simplify registrations, and help participants discover and join easily</p>
        <a href='/Login' className='bg-[#00df9a] hover:bg-[#00df98d5] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Hero;
