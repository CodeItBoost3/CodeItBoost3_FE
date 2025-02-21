import axiosInstance from "@/services/axiosInstance";
import { EventSourcePolyfill } from "event-source-polyfill";

export const connectSSE = (onMessage) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
    }

    const eventSource = new EventSourcePolyfill("http://54.180.113.3:3000/sse/subscribe", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            if (data.type === "COMMENT_CREATED") {
                onMessage(data);
            }
        } catch (error) {
            console.error("SSE 데이터 파싱 실패:", error);
        }
    };

    eventSource.onerror = () => {
        eventSource.close();
    };

    return eventSource;
};


  
/** 알림 가져오기 */
export const getNotification = async () => {
  try {
      let allNotifications = [];
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= totalPages) {
          const response = await axiosInstance.get(`/users/me/notifications?page=${currentPage}&pageSize=20`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
          });

          const { data } = response; // ✅ 서버 응답 구조 반영
          const { transformedNotifications, totalPages: fetchedTotalPages } = data.data; 

          if (transformedNotifications) {
              allNotifications = [...allNotifications, ...transformedNotifications];
          }

          totalPages = fetchedTotalPages;
          currentPage += 1;
      }

      return allNotifications;
  } catch {
      throw new Error("알림 가져오기 실패");
  }
};

  

/** 알림 비우기 */
export const clearNotifications = async () => {
  try {
    await axiosInstance.delete("/users/me/notifications");
  } catch {
    throw new Error("알림을 모두 삭제하는 데 실패했습니다.");
  }
};

/** 특정 알림 지우기 */
export const deleteNotification = async (notificationId) => {
  try {
    await axiosInstance.delete(`/users/me/notifications/${notificationId}`);
  } catch {
    throw new Error(`알림 ID ${notificationId} 삭제 실패`);
  }
};

const notificationService = {
    connectSSE,
    getNotification,
    clearNotifications,
    deleteNotification
  };
  
  export default notificationService;
  