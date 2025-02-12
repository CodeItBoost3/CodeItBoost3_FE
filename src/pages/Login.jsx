import { useState } from "react";
import Logo from "@/assets/image/logo-image.svg";
import LoginForm from "@/components/login/LoginForm";
import SignupForm from "@/components/login/SignupForm";

export default function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-lightViolet-active to-bg-violet relative overflow-hidden">
      <div className={`flex items-center justify-center gap-10 transition-all duration-500 w-full max-w-[900px]`}>
      <div
          className={`w-[28vw] min-w-[350px] min-h-[550px] z-10 flex h-[76vh] flex-col items-center justify-start gap-[60px] 
            rounded-xl border border-white bg-white/70 px-11 py-20 shadow-lg transition-all duration-500 ${
              showLoginForm || showSignupForm ? "-translate-x-10" : "translate-x-0 opacity-100"
            }`}
        >
          <div className="inline-flex flex-col justify-start gap-10 self-stretch">
            <img src={Logo} className="size-[90px]" alt="로고 이미지" />
            <div className="flex flex-col items-start justify-start gap-10 self-stretch">
              <div className="flex flex-col items-start justify-start gap-10 self-stretch">
                <div className="ml-2 flex flex-col items-start justify-start gap-[22px] self-stretch">
                  <h1 className="self-stretch text-start">
                    <span className="text-2xl font-semibold leading-tight text-darkViolet">
                      조각집
                    </span>
                    <span className="text-lg font-semibold leading-tight text-black">
                      에 오신 것을 환영합니다.
                    </span>
                  </h1>
                  <div className="self-stretch text-start text-sm font-medium leading-snug text-darkerGray">
                    추억 게시와 그룹 소통을 위해
                    <br />
                    로그인 혹은 회원가입이 필요합니다.
                  </div>
                </div>
                <div className="w-full gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginForm(true);
                      setShowSignupForm(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active py-2.5 text-sm font-medium tracking-tight text-black"
                  >
                    로그인
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginForm(false);
                      setShowSignupForm(true);
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-darkViolet hover:bg-darkViolet-hover active:bg-darkViolet-active py-2.5 text-sm font-medium tracking-tight text-white"
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex h-6 items-center justify-end gap-[332px] self-stretch">
            <div className="text-xs font-normal leading-none text-darkGray-active">
              © CodeItBoost3 2025
            </div>
          </div>
        </div>

        {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
        {showSignupForm && <SignupForm onClose={() => setShowSignupForm(false)} />}
      </div>
    </div>
  );
}
