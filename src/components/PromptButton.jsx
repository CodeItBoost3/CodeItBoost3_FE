import { useState, useEffect, useRef } from "react";
import axiosInstance from "@/services/axiosInstance";
import { LightBulbIcon } from "@heroicons/react/24/solid";

export default function PromptButton() {
  const [prompt, setPrompt] = useState(""); 
  const [displayedText, setDisplayedText] = useState("");
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef(null);

  const fetchPrompt = async () => {
    setIsLoading(true);
    setDisplayedText(""); 
    clearInterval(intervalRef.current);

    try {
      const response = await axiosInstance.get("/prompt");
      const newPrompt = response.data?.data?.prompt || "글감을 가져올 수 없습니다. 다시 시도해주세요.";

      setPrompt(newPrompt); 
      setDisplayedText("");
      setIsLoading(false);
    } catch (error) {
      console.error("글감 추천 실패:", error.message);
      setPrompt("글감을 가져올 수 없습니다. 다시 시도해주세요.");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!prompt || prompt.length === 0) return;
  
    let i = 0;
    setDisplayedText(""); 
  
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  
    intervalRef.current = setInterval(() => {
      if (i >= prompt.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
  
      setDisplayedText(prompt.slice(0, i + 1));
      i++; 
    }, 70);
  
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prompt]);
  

  return (
    <>
      <button
        className={`fixed bottom-10 right-10 bg-purple-500 hover:bg-purple-600 text-white 
        shadow-lg flex items-center justify-center transition-all duration-300 rounded-full
        h-16 w-16 overflow-hidden ${hovered ? "w-44" : "w-14"}`}
        onClick={fetchPrompt}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <LightBulbIcon className="w-8 h-8 flex-shrink-0 transition-all duration-300" />
        <span
          className={`transition-all duration-300 text-lg font-medium ${
            hovered ? "opacity-100 w-auto ml-3" : "opacity-0 w-0"
          }`}
        >
          글감 추천
        </span>
      </button>

      {prompt && (
        <div className="fixed bottom-20 right-10 bg-white shadow-lg rounded-lg p-4 w-64">
          <p className="text-gray-800">
            {isLoading ? "⏳ 생성 중..." : displayedText}
          </p>
          <button
            className="mt-2 text-sm text-gray-600 underline"
            onClick={() => {
              setPrompt("");
              setDisplayedText("");
            }}
          >
            닫기
          </button>
        </div>
      )}
    </>
  );
}
