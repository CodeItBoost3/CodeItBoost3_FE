import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logo from '@/layouts/Logo';
import { BellIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
        <header
            className={`w-full fixed h-16 flex items-center justify-between px-10 py-1 
            transition-all duration-300 z-20 ${
                isScrolled ? "bg-white/70" : "bg-transparent"
            }`}
        >
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <BellIcon className="w-8 h-8 text-gray-500 hover:text-black" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <Link to="/mypage">
            <UserIcon className="w-8 h-8 text-gray-500 hover:text-black" />
          </Link>
        </div>
      </header>
    );
  }
  
