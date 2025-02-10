import Notice from "@/assets/icon/layout/notice.svg";

export default function NoticeCard() {
  return (
    <div className="w-[95%] mt-4 mb-7 h-[9vh] px-[15px] py-[10px] bg-white rounded-[18.51px] shadow-[2.3px_4.6px_13px_0px_rgba(0,0,0,0.08)] border border-darkWhite flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-[46px] h-[46px] bg-lightViolet rounded-full flex items-center justify-center relative">
          <img src={Notice} className="w-[30px] h-[30px]" />
        </div>
        <div className="text-black text-lg font-normal">
          조각집 사용법 보러가기
        </div>
      </div>
      <button className="w-[106px] h-[40px] bg-darkViolet hover:bg-darkViolet-hover active:bg-darkViolet-active rounded-full flex items-center justify-center">
        <span className="text-white text-base font-normal">자세히</span>
      </button>
    </div>
  );
}
