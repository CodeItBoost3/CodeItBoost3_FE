import { useState } from "react";
import authService from "@/services/user/authService";
import { useToast } from "@/hooks/useToast";

export default function LoginForm({ onClose, onNavigateHome }) {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const addToast = useToast();

  const handleLogin = async () => {
    try {
      const response = await authService.login(clientId, password);
  
      const { accessToken } = response.data;


      const expires = new Date();
      expires.setHours(expires.getHours() + 24);
      localStorage.setItem("tokenExpires", expires.toISOString());

      localStorage.setItem("accessToken", `${accessToken}`);
  
      addToast("로그인에 성공하였습니다.");
      onNavigateHome();

    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          addToast("비밀번호가 일치하지 않습니다.");
        } else if (status === 404) {
          addToast("일치하는 ID가 없습니다.");
        } else {
          addToast("로그인 중 오류가 발생했습니다.");
        }
      } else {
        addToast("서버에 연결할 수 없습니다.");
      }
    }
  };
  

  return (
    <div className="w-[28vw] min-w-[370px] min-h-[580px] z-10 flex h-[76vh] flex-col items-center justify-start gap-[40px] 
        rounded-xl border border-white bg-white/70 px-11 py-10 shadow-lg transition-all duration-500 translate-x-0 opacity-100">
      
      <button
        onClick={onClose}
        className="self-start text-darkGray hover:text-darkGray-hover active:text-darkGray-active font-bold text-3xl"
      >
        ←
      </button>

      <div className="ml-1 flex flex-col items-start justify-start gap-[22px] self-stretch">
        <h1 className="self-stretch text-start">
          <span className="text-2xl mr-2 font-semibold leading-tight text-darkViolet">조각집</span>
          <span className="text-2xl font-semibold leading-tight text-black">로그인</span>
        </h1>
      </div>

      <div className="flex flex-col w-full gap-4">
        <label className="text-sm font-medium text-black">아이디</label>
        <div className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 
            focus-within:border-normalViolet bg-bg focus-within:ring-2 focus-within:ring-normalViolet transition">
          <input
            type="text"
            placeholder="아이디를 입력해 주세요"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="bg-transparent flex-1 outline-none text-darkerGray focus:ring-0 focus:outline-none"
          />
        </div>

        <label className="text-sm font-medium text-black">비밀번호</label>
        <div className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 
            focus-within:border-normalViolet bg-bg focus-within:ring-2 focus-within:ring-normalViolet transition">
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent flex-1 outline-none text-darkerGray focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogin}
        className="w-full mt-1 rounded-md bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active py-2.5 text-sm font-medium tracking-tight text-black"
      >
        로그인
      </button>
    </div>
  );
}
