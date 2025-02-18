import Logo from "@/assets/image/logo-image.svg";

export default function NeedLoginToGuest({onClick}) {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-[470px] bg-white rounded-2xl p-20 shadow-lg">
          <img src={Logo} className="size-[90px]" alt="로고 이미지"/>
          <div className="flex flex-col items-start justify-start gap-10 self-stretch mt-5">
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
                  <br/>
                  로그인 혹은 회원가입이 필요합니다.
                </div>
              </div>
              <div className="w-full gap-1 mt-3">
                <button
                    type="button"
                    onClick={() => onClick("login")}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active py-2.5 text-sm font-medium tracking-tight text-black"
                >
                  로그인
                </button>
                <button
                    type="button"
                    onClick={() => onClick("register")}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-darkViolet hover:bg-darkViolet-hover active:bg-darkViolet-active py-2.5 text-sm font-medium tracking-tight text-white"
                >
                  회원가입
                </button>
                <p className="text-black font-medium text-center mt-5 cursor-pointer" onClick={() => onClick("guest")}>로그인 없이 둘러보기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}