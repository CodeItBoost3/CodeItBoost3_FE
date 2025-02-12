import { useState } from "react";

export default function SignupForm({ onClose, onNavigateLogin }) {
    const [isSignupComplete, setIsSignupComplete] = useState(false);

    return (
        <div className="w-[28vw] min-w-[350px] min-h-[550px] z-10 flex h-[76vh] flex-col items-center justify-start gap-[40px] 
            rounded-xl border border-white bg-white/70 px-11 py-6 shadow-lg transition-all duration-500 translate-x-0 opacity-100"
        >
            <button
                onClick={onClose}
                className="self-start text-darkGray hover:text-darkGray-hover active:text-darkGray-active font-bold text-3xl"
            >
                ←
            </button>

            {isSignupComplete ? (
                <div className="my-5 flex flex-col gap-6 items-start text-start w-full">
                    <h2 className="text-xl text-darkerGray font-semibold">닉네임님 환영합니다!</h2>
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
            ) : (
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
                        <div className="flex items-center space-x-3 w-full">
                            <div className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus-within:border-normalViolet 
                                bg-bg focus-within:ring-2 focus-within:ring-normalViolet transition">
                                <input
                                    type="text"
                                    placeholder="아이디를 입력해 주세요"
                                    className="w-full bg-transparent outline-none text-darkerGray focus:ring-0 focus:outline-none"
                                />
                            </div>
                            <button 
                                type="button" 
                                className="px-4 py-2 h-full text-sm font-medium text-white bg-normalViolet hover:bg-normalViolet-hover 
                                rounded-md transition"
                            >
                                중복확인
                            </button>
                        </div>

                        <label className="text-sm font-medium text-black">비밀번호</label>
                        <div className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 
                            focus-within:border-normalViolet bg-bg focus-within:ring-2 focus-within:ring-normalViolet transition">
                            <input
                                type="password"
                                placeholder="비밀번호를 입력해 주세요"
                                className="bg-transparent flex-1 outline-none text-darkerGray focus:ring-0 focus:outline-none"
                            />
                        </div>

                        <label className="text-sm font-medium text-black">닉네임</label>
                        <div className="flex items-center space-x-3 border border-gray-300 rounded-md px-4 py-2 
                            focus-within:border-normalViolet bg-bg focus-within:ring-2 focus-within:ring-normalViolet transition">
                            <input
                                type="text"
                                placeholder="닉네임을 입력해 주세요"
                                className="bg-transparent flex-1 outline-none text-darkerGray focus:ring-0 focus:outline-none"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsSignupComplete(true)}
                        className="w-full mt-1 rounded-md bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active py-2.5 text-sm font-medium tracking-tight text-black"
                    >
                        회원가입
                    </button>
                </>
            )}
        </div>
    );
}
