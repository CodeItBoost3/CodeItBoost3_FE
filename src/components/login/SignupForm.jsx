import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import useSignupForm from "@/hooks/useSignupForm";
import authService from "@/services/user/authService";

export default function SignupForm({ onClose, onNavigateLogin }) {
    const [isSignupComplete, setIsSignupComplete] = useState(false);
    const { formData, errors, handleChange } = useSignupForm();
    const [idCheckMessage, setIdCheckMessage] = useState("");
    const [isIdAvailable, setIsIdAvailable] = useState(null);
    const addToast = useToast();

    const handleIdCheck = async () => {
        if (!formData.id) {
            setIdCheckMessage("아이디를 입력해 주세요.");
            setIsIdAvailable(false);
            return;
        }
    
        try {
            const isAvailable = await authService.checkIdAvailability(formData.id);
            setIsIdAvailable(isAvailable);
            setIdCheckMessage(isAvailable ? "사용 가능한 ID입니다." : "이미 존재하는 ID입니다.");
        } catch  {
            setIsIdAvailable(false);
            setIdCheckMessage("아이디 중복 확인 중 오류가 발생했습니다.");
        }
    };
    
    const handleSignup = async () => {
        if (!isIdAvailable) {
            addToast("아이디 중복 확인을 완료해 주세요.");
            return;
        }
    
        console.log("회원가입 요청 formData:", formData);
    
        try {
            await authService.signup({
                clientId: formData.id, 
                password: formData.password, 
                nickname: formData.nickname
            });
            setIsSignupComplete(true);
            addToast("회원가입이 완료되었습니다!");
        } catch (error) {
            console.error("회원가입 오류:", error);
            addToast("회원가입 중 오류가 발생했습니다.");
        }
    };
    

    return (
        <div className="w-[28vw] min-w-[370px] min-h-[580px] z-10 flex h-[76vh] flex-col items-center justify-start gap-[40px] 
            rounded-xl border border-white bg-white/70 px-11 py-6 shadow-lg transition-all duration-500 translate-x-0 opacity-100"
        >
            <button
                onClick={onClose}
                className="self-start text-darkGray hover:text-darkGray-hover active:text-darkGray-active font-bold text-3xl"
            >
                ←
            </button>

            {!isSignupComplete ? (
                <>
                    <div className="ml-1 flex flex-col items-start justify-start gap-[22px] self-stretch">
                        <h1 className="self-stretch text-start">
                            <span className="text-2xl mr-2 font-semibold leading-tight text-darkViolet">
                                조각집 
                            </span>
                            <span className="text-2xl font-semibold leading-tight text-black">
                                회원가입
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <label className="text-sm font-medium text-black">아이디</label>
                        <div className="relative flex items-center space-x-3 w-full">
                            <div className={`relative flex-1 border rounded-md px-4 py-2 transition 
                                ${errors.id ? "bg-bg border-red-500 focus-within:border-red-500" : "border-gray-300 focus-within:border-normalViolet bg-bg focus-within:ring-2 focus-within:ring-normalViolet"}`}
                            >
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    placeholder="아이디를 입력해 주세요"
                                    className="w-full bg-transparent outline-none text-darkerGray focus:ring-0 focus:outline-none"
                                />
                                {errors.id && (
                                    <p className="absolute bottom-[-18px] left-0 text-red-500 text-xs">
                                        {errors.id}
                                    </p>
                                )}
                                {idCheckMessage && (
                                    <p className={`absolute mt-[10px] text-xs ${isIdAvailable ? "text-green-500" : "text-red-500"}`}>
                                        {idCheckMessage}
                                    </p>
                                )}
                            </div>
                            <button 
                                type="button" 
                                onClick={handleIdCheck}
                                className="px-4 py-2 h-full text-sm font-medium text-white bg-normalViolet hover:bg-normalViolet-hover rounded-md transition"
                            >
                                중복확인
                            </button>
                        </div>

                        <label className="text-sm font-medium text-black">비밀번호</label>
                        <div className="relative">
                            <div className={`relative border rounded-md px-4 py-2 transition w-full
                                ${errors.password ? "bg-bg border-red-500 focus-within:border-red-500" : "border-gray-300 focus-within:border-normalViolet bg-bg focus-within:ring-2 focus-within:ring-normalViolet"}`}
                            >
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="비밀번호를 입력해 주세요"
                                    className="w-full bg-transparent outline-none text-darkerGray focus:ring-0 focus:outline-none"
                                />
                                {errors.password && (
                                    <p className="absolute bottom-[-18px] left-0 text-red-500 text-xs">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <label className="text-sm font-medium text-black">닉네임</label>
                        <div className="relative">
                            <div className={`relative border rounded-md px-4 py-2 transition w-full
                                ${errors.nickname ? "bg-bg border-red-500 focus-within:border-red-500" : "border-gray-300 focus-within:border-normalViolet bg-bg focus-within:ring-2 focus-within:ring-normalViolet"}`}
                            >
                                <input
                                    type="text"
                                    name="nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    placeholder="닉네임을 입력해 주세요"
                                    className="w-full bg-transparent outline-none text-darkerGray focus:ring-0 focus:outline-none"
                                />
                                {errors.nickname && (
                                    <p className="absolute bottom-[-18px] left-0 text-red-500 text-xs">
                                        {errors.nickname}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleSignup}
                        className="w-full mt-1 rounded-md bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active py-2.5 text-sm font-medium tracking-tight text-black"
                    >
                        회원가입
                    </button>
                </>
            ) : (
                <div className="my-5 flex flex-col gap-6 items-start text-start w-full">
                    <h2 className="text-xl text-darkerGray font-semibold">{formData.nickname}님 환영합니다!</h2>
                    <p className="text-lg text-black font-semibold mt-2">
                        이제 <span className="text-darkViolet font-bold">조각집</span>에서 <br />
                        사람들과 즐거운 추억을 쌓아 보세요.
                    </p>
                    <p className="text-sm text-black-hover mt-4">
                        로그인 버튼을 클릭하면 로그인 페이지로 이동됩니다.
                    </p>
                    <button
                        onClick={onNavigateLogin}
                        className="w-full mt-6 rounded-md bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active py-2.5 text-sm font-medium tracking-tight text-black"
                    >
                        로그인
                    </button>
                </div>
            )}
        </div>
    );
}
