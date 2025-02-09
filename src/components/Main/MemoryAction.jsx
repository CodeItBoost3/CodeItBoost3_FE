import LogoImage from "@/assets/image/logo-image.svg";

export default function MemoryActions({ widthClass = "flex-1" }) {
  return (
    <div className={`${widthClass} mt-[7vh] h-auto px-3 py-6 bg-[#f4dffb]/20 rounded-lg border border-normalGray flex flex-col justify-between`}>
      <div className="self-stretch flex flex-col gap-2">
        <div className="px-1 pb-2 text-base font-semibold rounded-lg flex items-center">
          <span className="text-darkViolet">조각집</span>
          <span className="text-black">에서 새로운 추억을 기록해 보세요!</span>
        </div>
      </div>
      <div className="flex my-4 justify-start opacity-50 w-full h-auto relative">
        <div className="w-[5vw] h-auto rounded-full flex items-center justify-center">
          <img src={LogoImage} className="w-full" alt="조각집 로고" />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="bg-white rounded-md p-3 shadow-sm">
          <span className="text-black text-sm font-normal">
            새로운 <span className="text-darkViolet">조각 그룹</span> 등록하기
          </span>
        </div>
        <div className="bg-white rounded-md p-3 shadow-sm">
          <span className="text-[#2a2a2a] text-sm font-normal">
            새로운 <span className="text-darkViolet">추억</span> 기록하기
          </span>
        </div>
      </div>
    </div>
  );
}
