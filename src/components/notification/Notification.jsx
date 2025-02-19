import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import TimeIcon from "@/assets/icon/notification/time.svg";
import notificationService from "@/services/notification/notificationService";

export default function Notification({ onClose }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotification();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchNotifications();
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="relative w-[20vw] min-w-[300px] min-h-[60vh] bg-bg-violet rounded-lg shadow-lg p-4">
        
      <div className="absolute top-[-8px] right-10 w-5 h-5 bg-bg-violet transform rotate-45"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={TimeIcon} className="w-5 h-5 text-normalViolet-active" />
          <span className="text-black font-medium">알림 목록</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center justify-between overflow-hidden bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <div>
                <h3 className="text-sm font-medium text-black">
                  {truncateText(notification.title, 20)}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {truncateText(notification.description, 20)}
                </p>
              </div>
              <button className="text-gray-400 hover:text-black">
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">알림이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
