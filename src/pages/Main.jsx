import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "@/services/user/userService";
import { useToast } from "@/hooks/useToast";

import PublicGroupCard from "@/components/common/PublicGroupCard";
import NoticeCard from "@/components/main/NoticeCard";
import MemoryCard from "@/components/main/MemoryCard";
import MemoryActions from "@/components/main/MemoryAction";

import image from "@/assets/icon/main/default-image.png";
import NoArticleIcon from "@/assets/icon/main/edit.svg";

const groupData = [
  { id: 1, title: "그룹 1", description: "설명 1", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 2, title: "그룹 2", description: "설명 2", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 3, title: "그룹 3", description: "설명 3", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 4, title: "그룹 4", description: "설명 4", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
];

const memoryData = [
  // { id: 1, title: "글 제목 1", date: "2025.01.21", memory: "8", sympathy: "5", comments: "5" },
  // { id: 2, title: "글 제목 2", date: "2025.01.20", memory: "12", sympathy: "7", comments: "9" },
];

export default function Main() {
  // const [token, setToken] = useState("");
  const [nickname, setNickname] = useState("예비 사용자");
  const navigate = useNavigate();
  const addToast = useToast();
    
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const data = await userService.getUserInfo();
          setNickname(data.data.nickname);
        } catch {
          addToast("사용자 정보를 불러올 수 없습니다.");
        }
      };
    
      fetchUserInfo();
    }, []);

    // useEffect(() => {
    //   setToken(localStorage.getItem("accessToken"));
    // }, [])
    
  return (
    <div className="w-full h-full pt-3 pb-7 overflow-auto">
      <div className="flex items-center mb-1">
        <span className="text-darkViolet text-2xl font-semibold">
        {nickname}
        </span>
        <span className="text-black text-2xl font-semibold">
        님, 안녕하세요!
        </span>
      </div>
      <NoticeCard />
      <div className="max-w-[95%] flex flex-col gap-3 my-3">
        <div className="flex justify-between items-center">
          <span className="text-black text-xl font-semibold">
            새로운 <span className="text-darkViolet">조각집</span>에 참여해 보세요!
          </span>
          <span onClick={() => navigate('/group')} className="cursor-pointer text-normalGray hover:text-normalGray-hover active:text-normalGray-active text-lg">공개 그룹 목록 보러가기</span>
        </div>
        <div className=" w-full py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupData.map((group) => (
              <PublicGroupCard
                key={group.id}
                id={group.id}
                title={group.title}
                description={group.description}
                image={group.image}
                picturecount={group.picturecount}
                emotioncount={group.emotioncount}
                badgecount={group.badgecount}
                days={group.days} 
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex max-w-[96%] justify-between items-start gap-6 h-auto">
    {/* 섹션 1 */}
    <div className="flex-1 flex-col justify-start items-start gap-[14.48px]">
      <div className="self-stretch h-[7vh] px-2 flex justify-between items-center">
        <div>
          <span className="text-black text-base font-semibold">최근에 내가 작성한 </span>
          <span className="text-darkViolet text-base font-semibold">추억 글</span>
        </div>
        <div className="cursor-pointer text-right text-normalGray hover:text-normalGray-hover active:text-normalGray-active text-sm font-semibold">
          전체 글 보러가기
        </div>
      </div>
      {/* 섹션 1 카드 */}
      <div className="h-auto w-full bg-white rounded-[17.33px] p-4 shadow-md flex flex-col gap-5">
        {memoryData?.map((item, idx) => (
          <MemoryCard
            key={item.id}
            index={idx}
            title={item.title}
            date={item.date}
            memory={item.memory}
            sympathy={item.sympathy}
            comments={item.comments}
          />
        ))}
        {memoryData.length === 0 &&
            <div className="flex flex-col items-center justify-center h-[30vh] text-center text-gray-500">
              <img src={NoArticleIcon} alt="No Group" className="w-30 h-30 mb-4"/>
              <p className="text-xl font-semibold">최근에 내가 작성한 추억글이 없습니다.</p>
              <p className="text-sm text-gray-400">첫번째 추억글을 작성해보세요!</p>
              <button className="mt-4 px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
                추억 올리기
              </button>
            </div>
        }
      </div>
    </div>
        {/* 섹션 2 */}
        <MemoryActions widthClass="flex-1" marginTop="mt-[7vh]"/>
      </div>

    </div>
  );
}
