import lock from "@/assets/icon/main/lock.svg";
import picture from "@/assets/icon/main/picture.svg";
import logo from "@/assets/image/logo-image.svg";

export default function PrivateGroupCard({ id, title, days, picturecount, emotioncount, onClick }) {

  return (
    <div  onClick={() => onClick(id)} className="cursor-default hover:shadow-card w-[20vw] min-w-[210px] min-h-[20vh] px-1 pb-3 pt-5 relative bg-white rounded-[10px] border border-lightViolet overflow-hidden">
        <div className="px-4 pb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex px-3 py-1 text-sm text-darkGray-active bg-lightViolet-hover rounded-lg">
              {days} | <img src={lock} alt="잠금"></img>
            </span>
          </div>
  
          <div>
            <h3 className="text-black pt-1 text-md font-medium">{title}</h3>
          </div>
  
          <div className="flex justify-start gap-3 items-center mt-4 text-sm text-black">
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
          </div>
        </div>
    </div>
  );
}
