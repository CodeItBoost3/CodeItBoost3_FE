import { useState, useEffect } from "react";
import { X, Trash2, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import TimeIcon from "@/assets/icon/notification/time.svg";
import notificationService from "@/services/notification/notificationService";
import useValidateLogin from "@/hooks/useValidateLogin.js";
import AlertModal from "@/components/modal/Alert";

export default function Notification({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const addToast = useToast();
  const { isLogin } = useValidateLogin();
  const navigate = useNavigate();
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: () => {},
    onCancel: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
  });
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotification();
        setNotifications(data || []);
      } catch (error) {
        if (isLogin) addToast(error.message);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = (id) => {
    setAlertConfig({
      isOpen: true,
      title: "알림 삭제",
      message: "이 알림을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await notificationService.deleteNotification(id);
          setNotifications((prev) => prev.filter((notif) => notif.id !== id));
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          addToast(error.message);
        }
      },
      onCancel: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
    });
  };

  const handleClearAllNotifications = () => {
    setAlertConfig({
      isOpen: true,
      title: "전체 삭제 확인",
      message: "모든 알림을 삭제하시겠습니까?",
      confirmText: "전체 삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await notificationService.clearNotifications();
          setNotifications([]);
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
          addToast("알림이 모두 삭제되었습니다.");
        } catch (error) {
          addToast(error.message);
        }
      },
      onCancel: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
    });
  };

  const handleNotificationClick = (groupId, postId) => {
    if (groupId && postId) {
      navigate(`/group/${groupId}/post/${postId}`);
      onClose();
    } else {
      addToast("잘못된 알림 정보입니다.");
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <>
      <div className="relative w-[20vw] min-w-[320px] min-h-[60vh] bg-bg-violet rounded-lg shadow-lg p-4">
        <div className="absolute top-[-8px] right-10 w-5 h-5 bg-bg-violet transform rotate-45"></div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={TimeIcon} className="w-5 h-5 text-normalViolet-active" />
            <span className="text-black font-medium text-lg">알림 목록</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClearAllNotifications} 
              className="text-gray-600 hover:text-black text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-200 transition"
            >
              전체 삭제
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50 transition cursor-pointer"
                onClick={() => handleNotificationClick(notification.groupId, notification.postId)}
              >
                <div>
                  <h3 className="text-sm font-semibold text-black whitespace-nowrap">
                    {notification.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    🕒 {formatDate(notification.time)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notification.id);
                    }}
                    className="text-gray-500 hover:text-red-400 transition"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <button className="text-gray-400 hover:text-black">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">알림이 없습니다.</p>
          )}
        </div>
      </div>

      <AlertModal {...alertConfig} />
    </>
  );
}
