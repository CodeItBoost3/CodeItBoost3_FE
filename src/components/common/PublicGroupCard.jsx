import lock from "@/assets/icon/main/lock-open.svg";
import picture from "@/assets/icon/main/picture.svg";
import badge from "@/assets/icon/main/badge.svg";
import logo from "@/assets/image/logo-image.svg";

export default function PublicGroupCard({ image, days, title, description, picturecount, emotioncount, badgecount }) {
    return (
      <div className="hover:shadow-card w-[20vw] min-h-[45vh] h-auto bg-white rounded-[7px] border border-lightViolet flex flex-col overflow-hidden">
        <div className="relative w-full p-5 h-[30vh]">
          <img
            className=" rounded-md w-full h-full object-cover"
            src={image}
            alt="그룹 이미지"
          />
        </div>
        <div className="px-5 pb-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="flex px-3 py-1 text-sm text-darkGray-active bg-lightViolet-hover rounded-lg">
              {days} | <img src={lock} alt="잠금"></img>
            </span>
          </div>
  
          <div>
            <h3 className="text-black text-md font-semibold">{title}</h3>
            <p className="text-darkGray-active text-sm">{description}</p>
          </div>
  
          <div className="flex justify-start gap-5 items-center mt-4 text-sm text-black">
            <div className="flex flex-col items-center justify-center gap-1">
                <span>추억</span>
                <span className="flex items-center gap-2 text-black">
                    <img
                    src={picture}
                    alt="추억"
                    className="w-4 h-4"
                    />
                    {picturecount}
                </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
            <span>그룹 공감</span>
            <span className="flex items-center gap-2 text-black">
              <img
                src={logo}
                alt="그룹 공감"
                className="w-4 h-4"
              />
              {emotioncount}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
            <span>획득 배지</span>
            <span className="flex gap-2 text-black mr-3">
              <img
                src={badge}
                alt="획득 배지"
                className="w-4 h-4"
              />
              {badgecount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  