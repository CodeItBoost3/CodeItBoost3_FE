import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/layouts/Logo";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";
import Notification from "@/components/notification/Notification";
import notificationService from "@/services/notification/notificationService";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // 🔥 알림 개수 상태 추가

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const data = await notificationService.getNotification();
        setNotificationCount(data.length);
      } catch (error) {
        console.error("알림 개수 불러오기 실패:", error.message);
      }
    };

    fetchNotificationCount(); 

    const intervalId = setInterval(fetchNotificationCount, 5000);

    return () => clearInterval(intervalId); 
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

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
      <div className="relative flex items-center space-x-4">
        <button onClick={toggleNotification} className="relative">
          <BellIcon className="w-8 h-8 text-gray-500 hover:text-black" />
          
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {isNotificationOpen && (
          <div className="absolute top-12 right-3">
            <Notification onClose={closeNotification} />
          </div>
        )}

        <Link to="/mypage">
          <UserIcon className="w-8 h-8 text-gray-500 hover:text-black" />
        </Link>
      </div>
    </header>
  );
}
