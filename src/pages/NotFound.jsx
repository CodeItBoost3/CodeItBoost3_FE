import {useNavigate} from "react-router-dom";

import SideBar from "@/layouts/Sidebar";
import Header from "@/layouts/Header";

import ScrollToTop from "@/components/common/ScrollToTop";
import SquareButton from "@/components/common/SearchButton.jsx";

import NotfoundIcon from "@/assets/icon/notfound/notfound.svg";

export default function NotFound () {
  const navigate = useNavigate();

  const handleToGoHome = () => {
    navigate("/");
  }
    return (
        <div className="flex flex-col min-h-screen w-full bg-background">
          <ScrollToTop/>
          <div className="w-full ">
            <Header/>
          </div>

          <div className="flex flex-1 min-h-[100vh]">
            <div className="w-[130px] min-w-[130px] flex flex-col items-start px-3 py-2 space-y-4">
              <SideBar/>
            </div>
            <div className="flex flex-1 px-[20px] pt-[5%] pb-2">
              <div className="w-[94%] h-[95%] pt-3 pb-7 overflow-auto bg-white shadow-card rounded-[3%] flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <img src={NotfoundIcon}/>
                  <p className="text-black font-bold text-2xl mt-8">찾을 수 없는 페이지입니다.</p>
                  <p className="text-black font-normal text-xs mt-2.5">요청하신 페이지를 찾을 수 없거나, 잘못된 접근입니다.</p>
                  <SquareButton
                      name="홈으로"
                      onClick={handleToGoHome}
                      className="mt-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
  