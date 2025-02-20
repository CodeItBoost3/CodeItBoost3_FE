import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import dayjs from "dayjs";

import {useToast} from "@/hooks/useToast";

import groupService from "@/services/group/groupService.js";
import userService from "@/services/user/userService";


import PublicGroupCard from "@/components/common/PublicGroupCard";
import NoticeCard from "@/components/main/NoticeCard";
import MemoryCard from "@/components/main/MemoryCard";
import MemoryActions from "@/components/main/MemoryAction";
import NeedLoginToGuest from "@/components/modal/NeedLoginToGuest.jsx";
import CreateGroup from "@/components/modal/CreateGroup";

import NoArticleIcon from "@/assets/icon/main/edit.svg";
import NoGroupImg from "@/assets/icon/group/no-group.svg";

export default function Main() {
  const [isLogin, setIsLogin] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [isGroupMakeModalOpen, setIsGroupMakeModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [nickname, setNickname] = useState("예비 사용자");
  const navigate = useNavigate();
  const addToast = useToast();

  console.log(recentPosts)
  /** 사용자 정보 조회 **/
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userService.getUserInfo();
        setNickname(data.data.nickname);
        setIsLogin(true);
      } catch {
        setIsLogin(false);
        addToast("사용자 정보를 불러올 수 없습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  /** 그룹 목록 조회 **/
  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const response = await groupService.getGroupList({
          type: "public",
          sortBy: "latest",
          keyword: "",
        });
        if(response.status === "success") {
          setGroupList(response.data.groups || []);
        } else{
          throw new Error("그룹 목록 조회 실패");
        }
      } catch {
        addToast("그룹 목록 조회에 실패했습니다.");
      }
    };

    fetchGroupList();
  }, [])

  /** 내가 작성한 글 목록 조회 **/
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await userService.getMyPosts();
        if(response.status === "success") {
          setRecentPosts(response.data.posts || []);
        } else{
          throw new Error("내가 작성한 글 목록 조회 실패");
        }
        console.log(response);
      } catch {
        addToast("최근에 작성한 글 조회에 실패했습니다.");
      }
    }

    fetchRecentPosts();
  }, [])

  const handleLoginModal = (type) => {
    switch (type) {
      case "register":
        navigate("/login");
        break;
      case "guest":
        setIsLoginModalOpen(false);
        break;
    }
  }

  const handleGroupRegist = () => {
    !isLogin ? setIsLoginModalOpen(true) : setIsGroupMakeModalOpen(true)
  }

  const handleRecentNotice = () => {
    navigate("/notice/20")
  }

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
        <NoticeCard onClick={handleRecentNotice}/>
        <div className="max-w-[95%] flex flex-col gap-3 my-3">
          <div className="flex justify-between items-center">
          <span className="text-black text-xl font-semibold">
            새로운 <span className="text-darkViolet">조각집</span>에 참여해 보세요!
          </span>
            <span onClick={() => navigate('/group')}
                  className="cursor-pointer text-normalGray hover:text-normalGray-hover active:text-normalGray-active text-lg">공개 그룹 목록 보러가기</span>
          </div>
          <div className=" w-full py-3">
            {groupList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {groupList.map((group) => (
                      <PublicGroupCard
                          id={group.groupId}
                          key={group.groupId}
                          title={group.groupName}
                          description={group.description}
                          image={group.image}
                          picturecount={group.postCount}
                          emotioncount={group.likeCount}
                          badgecount={group.badgecount}
                          days={group.dday}
                      />
                  ))}
                </div>) : (
                <div
                    className="w-full min-h-[45vh] h-auto flex justify-center items-center bg-white rounded-[18.51px] shadow-[2.3px_4.6px_13px_0px_rgba(0,0,0,0.08)] border border-darkWhite">
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <img src={NoGroupImg} alt="No Group" className="w-30 h-30 mb-4"/>
                    <p className="text-lg font-semibold">등록된 그룹이 없습니다.</p>
                    <p className="text-sm text-gray-400">가장 먼저 그룹을 만들어보세요!</p>
                    <button onClick={handleGroupRegist}
                            className="mt-4 px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
                      그룹 만들기
                    </button>
                  </div>
                </div>
            )}
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
              <div
                  className="cursor-pointer text-right text-normalGray hover:text-normalGray-hover active:text-normalGray-active text-sm font-semibold">
                전체 글 보러가기
              </div>
            </div>
            {/* 섹션 1 카드 */}
            <div className="h-auto w-full bg-white rounded-[17.33px] p-4 shadow-md flex flex-col gap-5">
              {recentPosts.length > 0 ? (
                  recentPosts.map((item, idx) => (
                      <MemoryCard
                          key={idx}
                          index={idx}
                          title={item.title}
                          date={dayjs(item.createdAt).format("YYYY.MM.DD")}
                          group={item.group.groupName}
                          sympathy={item.likeCount}
                          comments={item.commentCount}
                      />
                  ))
              ) : (
                  <div className="flex flex-col items-center justify-center h-[30vh] text-center text-gray-500">
                    <img src={NoArticleIcon} alt="No Group" className="w-30 h-30 mb-8"/>
                    <p className="text-xl font-semibold">최근에 내가 작성한 추억글이 없습니다.</p>
                    <p className="text-sm text-gray-400 mt-1">조각집에 참여하고 추억글을 작성해보세요!</p>
                  </div>
              )}
            </div>
          </div>
          {/* 섹션 2 */}
          <MemoryActions widthClass="flex-1" marginTop="mt-[7vh]" onClickGroup={handleGroupRegist}/>
        </div>
        {isGroupMakeModalOpen && <CreateGroup onClose={() => setIsGroupMakeModalOpen(false)}/>}
        {isLoginModalOpen && <NeedLoginToGuest onClick={handleLoginModal}/>}
      </div>
  );
}
