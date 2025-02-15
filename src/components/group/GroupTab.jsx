import { useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Tab from "@/components/common/Tab";
import { groupTabList, GROUP_PARAMS } from "@/utils/constants";
import CreateGroup from "@/components/modal/CreateGroup"; 
import CreateMemory from "@/components/modal/CreateMemory"; 
export default function GroupTab() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const tabName = searchParams.get(GROUP_PARAMS) || "Public";

  const handleChangeTab = (type) => {
    setSearchParams({ [GROUP_PARAMS]: type });
  };

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
              : setIsModalOpen(true)
          }
          className="cursor-pointer whitespace-pre px-4 pb-[19px] text-center text-normalGray hover:text-normalGray-hover active:text-normalGray-active"
        >
          {isGroupDetailPage ? "추억 올리기" : "그룹 만들기"}
        </button>
      </Tab>
      {isModalOpen && <CreateGroup onClose={() => setIsModalOpen(false)} />}
      {isSecondModalOpen && <CreateMemory onClose={() => setIsSecondModalOpen(false)} />}
    </>
  );
}
