import { useState } from "react";
import {useNavigate} from "react-router-dom";
import LogoImage from "@/assets/image/logo-image.svg";
import SelectGroupModal from "@/components/modal/SelectGroupModal";
import NeedLoginToGuest from "@/components/modal/NeedLoginToGuest.jsx";
import CreateGroup from "@/components/modal/CreateGroup.jsx";

export default function MemoryActions({ widthClass = "flex-1", marginTop = "mt-0", isLogin }) {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);

  const navigate = useNavigate();

  const handleLoginModal = (type) => {
    switch (type) {
      case "register":
        navigate("/login");
        break;
      case "guest":
        setShowLoginModal(false);
        break;
    }
  }

  return (
    <div className={`${widthClass} ${marginTop} h-auto px-3 py-6 bg-[#f4dffb]/20 rounded-lg border border-normalGray flex flex-col justify-between`}>
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
        <div className="bg-white rounded-md p-3 shadow-sm cursor-pointer" onClick={() => !isLogin ? setShowLoginModal(true) : setShowCreateGroupModal(true)}>
          <span className="text-black text-sm font-normal">
            새로운 <span className="text-darkViolet">조각 그룹</span> 등록하기
          </span>
        </div>

        <div className="bg-white rounded-md p-3 shadow-sm cursor-pointer" onClick={() => !isLogin ? setShowLoginModal(true) : setShowMemoryModal(true)}>
          <span className="text-[#2a2a2a] text-sm font-normal">
            새로운 <span className="text-darkViolet">추억</span> 기록하기
          </span>
        </div>

        {showMemoryModal && (
          <SelectGroupModal 
            onClose={() => setShowMemoryModal(false)} 
            parentComponent="Main" 
          />
        )}
        {showLoginModal && (
            <NeedLoginToGuest onClick={handleLoginModal} parentComponent="Main"/>
        )}
        {showCreateGroupModal && (
            <CreateGroup onClose={() => setShowCreateGroupModal(false)} parentComponent="Main"/>
        )}
      </div>
    </div>
  );
}
