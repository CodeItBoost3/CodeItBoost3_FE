import { useState } from "react";
import {useSearchParams, useLocation, useNavigate} from "react-router-dom";
import Tab from "@/components/common/Tab";
import { groupTabList, GROUP_PARAMS } from "@/utils/constants";
import CreateGroup from "@/components/modal/CreateGroup"; 
import CreateMemory from "@/components/modal/CreateMemory";
import useValidateLogin from "@/hooks/useValidateLogin.js";
import NeedLoginToGuest from "@/components/modal/NeedLoginToGuest.jsx";

export default function GroupTab() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const tabName = searchParams.get(GROUP_PARAMS) || "Public";

  const navigate = useNavigate();
  const {isLogin} = useValidateLogin();

  const handleChangeTab = (type) => {
    setSearchParams({ [GROUP_PARAMS]: type });
  };

  const handleLoginModal = (type) => {
    switch (type) {
      case "register":
        navigate("/login");
        break;
      case "guest":
        setIsShowLoginModal(false);
        break;
    }
  }

  const isGroupDetailPage = location.pathname.includes("/group/");

  return (
    <>
      <Tab
        tabList={groupTabList}
        selectValue={tabName}
        onChangeValue={handleChangeTab}
      >
        <button
          type="button"
          onClick={() =>
            isGroupDetailPage
              ? setIsSecondModalOpen(true)
              : isLogin ? setIsModalOpen(true) : setIsShowLoginModal(true)
          }
          className="cursor-pointer whitespace-pre px-4 pb-[19px] text-center text-normalGray hover:text-normalGray-hover active:text-normalGray-active"
        >
          {isGroupDetailPage ? "추억 올리기" : "그룹 만들기"}
        </button>
      </Tab>
      {isModalOpen && <CreateGroup onClose={() => setIsModalOpen(false)} />}
      {isSecondModalOpen && <CreateMemory onClose={() => setIsSecondModalOpen(false)} />}
      {isShowLoginModal && <NeedLoginToGuest onClick={handleLoginModal}/>}
    </>
  );
}
