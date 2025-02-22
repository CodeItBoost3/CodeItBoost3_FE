import { useRouteError, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("⚠️ Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="red"
        className="w-20 h-20 mb-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
      </svg>

      <h1 className="text-2xl font-semibold text-red-600">페이지를 불러오는 중 오류가 발생했습니다.</h1>
      <p className="text-gray-700 text-sm mt-2">
        요청한 페이지를 로드할 수 없습니다. 다시 시도하거나, 메인 페이지로 이동하세요.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-5 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
      >
        홈으로 이동
      </button>
    </div>
  );
}
