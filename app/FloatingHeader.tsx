'use client';

import React, { useState, useEffect } from 'react';

interface FloatingHeaderProps {
  title: string;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  title,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 
        z-50
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-gradient-to-bl from-cyan-600 to-cyan-800 py-2'}
      `}>
      <div className="flex flex-col md:flex-row justify-between items-center p-6 py-0">
        {/* Title */}
        <h1 
          className={`
            m-2
            w-full
            text-2xl font-semibold
            transition-all duration-300
            ${isScrolled ? 'text-gray-800' : 'text-white'}
          `}
        >
          {title}
        </h1>
        <div className='flex w-full'/>
      </div>
    </header>
  );
};

export default FloatingHeader;