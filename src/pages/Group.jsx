import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/useToast";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoRefresh } from "react-icons/io5";

import userService from "@/services/user/userService";
import groupService from "@/services/group/groupService";
import groupInteractionService from "@/services/group/groupInteractionService";
import PrivateGroupModal from "@/components/modal/PrivateGroupModal";
import NoGroupImg from "@/assets/icon/group/no-group.svg";

import CreateGroup from "@/components/modal/CreateGroup"; 
import GroupTab from "@/components/group/GroupTab";
import PrivateGroupCard from "@/components/common/PrivateGroupCard";
import PublicGroupCard from "@/components/common/PublicGroupCard";
import Pagination from "@/components/common/Pagination";
import SearchBar from "@/components/common/SearchBar";
import SearchButton from "@/components/common/SearchButton";
import Select from "@/components/common/Select";

import NeedLoginToGuest from "@/components/modal/NeedLoginToGuest.jsx";

const GROUP_PARAMS = "group";

const options = [
  { label: "최신순", value: "latest" },
  { label: "추억 많은 순", value: "mostPosted" },
  { label: "배지 많은 순", value: "mostBadge" },
  { label: "공감순", value: "mostLiked" }
];


export default function Group() {
  const [isLogin, setLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [myId, setMyId] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const navigate = useNavigate();
  const tabName = searchParams.get(GROUP_PARAMS) || "Public";
  const isPublic = tabName === "Public";
  const addToast = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await userService.getUserInfo();
        setMyId(userInfo.data.id);
        setLogin(true);
      } catch {
        setLogin(false);
        if(isLogin) addToast("사용자 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };
  
    fetchUserInfo();
  }, []);
  
  const fetchGroupList = useCallback(async () => {
    if (isSearching) return; // 검색 중이면 요청하지 않음
  
    try {
      const response = await groupService.getGroupList({
        type: isPublic ? "public" : "private",
        sortBy,
        keyword: "",
        page: currentPage,
      });
  
      if (response.status === "success") {
        setGroupData(response.data.groups || []);
        setTotalPages(response.data.totalPage);
      }
    } catch {
      addToast("그룹 목록 조회에 실패했습니다.");
    }
  }, [isPublic, sortBy, currentPage, isSearching, addToast]);
  
  useEffect(() => {
    fetchGroupList();
  }, [fetchGroupList]);
  

  useEffect(() => {
    setSortBy(searchParams.get("sortBy") || "latest");
  }, [searchParams]);

  const handleLoginModal = (type) => {
    switch (type) {
      case "register":
        navigate("/login");
        break;
      case "guest":
        setIsShowLogin(false);
        break;
    }
  }
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setSearchResult([]);
      return;
    }
  
    setIsSearching(true);
    setSearchResult([]);
  
    try {
      const response = await groupService.searchGroups(searchTerm);
  
      if (response.status === "success") {
        const filteredResults = response.data.filter(group => group.isPublic === isPublic);
        setSearchResult(filteredResults || []); 
      } else {
        throw new Error("검색 실패");
      }
    } catch {
      if(isLogin) addToast("검색 결과를 불러오는 중 오류가 발생했습니다.");
    }
  };
  

  const resetSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setSearchResult([]);
  };

  const handleSelect = (selectedValue) => {
    if (selectedValue !== sortBy) {
      setSortBy(selectedValue);
      setSearchParams({ sortBy: selectedValue, group: tabName }, { replace: true });
    }
  };

  const handlePrivateGroupClick = async (groupId) => {
    if (!myId) {
      addToast("사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      console.log("[DEBUG] myId가 존재하지 않음, 사용자 정보 로드 중.");
      return;
    }
  
  
    try {
      const response = await groupService.getGroupDetail(groupId);
  
      const groupData = response;
  
      const isUserMember = groupData.members.some(member => member.userId === myId);
  
      if (!isUserMember && groupData.isPublic === false) {
        setSelectedGroupId(groupId);
        setIsPasswordModalOpen(true);
        return; 
      }
  
      navigate(`/group/${groupId}`);

    } catch {
      if(isLogin) addToast("그룹 정보 조회 중 오류가 발생했습니다.");
    }
  };
  
  
  const handlePasswordSubmit = async (password) => {
    try {
      const response = await groupInteractionService.verifyGroupPassword(selectedGroupId, password);
      
      if (response.status === "success") {
        addToast("비밀번호 확인 완료!");
        setIsPasswordModalOpen(false);
        window.location.href = `/group/${selectedGroupId}`;
      } else {
        addToast("비밀번호가 틀렸습니다.");
      }
    } catch {
      addToast("비밀번호 검증 중 오류가 발생했습니다.");
    }
  };

  
  const decodeImageUrl = (url) => {
    if (!url) return null;
  
    try {
      // URL 디코딩
      const decodedUrl = decodeURIComponent(url);
  
      // d~~로 시작하는지 확인 (예: d123abc)
      const isPatternMatched = decodedUrl.match(/^d[\w-]+/);
  
      // 무조건 https://를 붙이고, d~~로 시작하는 게 없으면 CDN 도메인도 붙이기
      return isPatternMatched
        ? `https://${decodedUrl}`
        : `https://d1up383l0okfvw.cloudfront.net/${decodedUrl}`;
    } catch {
      return `https://d1up383l0okfvw.cloudfront.net/${url}`;
    }
  };
  
  

  
  return (
    <div className="max-w-[95%] w-full h-full pt-3 pb-7">
      <div className="flex items-center mb-2">
        <span className="text-darkViolet text-2xl font-semibold">조각</span>
        <span className="text-black text-2xl font-semibold">그룹 목록</span>
      </div>

      <GroupTab />

      <div className="flex mt-4 items-center gap-5" style={{ flexBasis: '60%' }}>
        <Select options={options} onSelect={handleSelect} value={sortBy} />

        <SearchBar
          name="search"
          placeholder="그룹 이름을 검색해 주세요."
          width="w-full"
          height="h-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onEnter={handleSearch}
        />
        {isSearching && (
          <button onClick={resetSearch} className="p-2 text-gray-500 font-bold hover:text-black">
            <IoRefresh size={28} />
          </button>
        )}
        <SearchButton
          name="검색하기"
          onClick={handleSearch}
          className="h-full whitespace-nowrap font-medium"
        />
      </div>

      <div className="w-full mt-3 py-3">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {(isSearching ? searchResult : groupData).length > 0 ? (
        (isSearching ? searchResult : groupData).map((group) =>
          group.isPublic ? (
            <PublicGroupCard
              id={group.groupId}
              key={group.groupId}
              title={group.groupName}
              description={group.description}
              image={decodeImageUrl(group.imageUrl)}
              picturecount={group.postCount}
              emotioncount={group.likeCount}
              badgecount={group.badgeCount}
              days={group.dday}
            />
          ) : (
            <PrivateGroupCard
              id={group.groupId}
              key={group.groupId}
              title={group.groupName}
              days={group.dday}
              emotioncount={group.likeCount}
              picturecount={group.postCount}
              onClick={handlePrivateGroupClick}
            />
          )
        )
      ) : (
        <div className="bg-white min-w-[85vw] h-[80vh] max-h-[80vh] w-full rounded-[30px]">
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <img src={NoGroupImg} alt="No Group" className="w-30 h-30 mb-4" />
            <p className="text-lg font-semibold">
              {isSearching ? "검색 결과가 없습니다." : isPublic ? "등록된 공개 그룹이 없습니다." : "등록된 비공개 그룹이 없습니다."}
            </p>
            <p className="text-sm text-gray-400">가장 먼저 그룹을 만들어보세요!</p>
            {!isSearching && (
              <button onClick={() => isLogin ? setIsModalOpen(true) : setIsShowLogin(true)}
                      className="mt-4 px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
                그룹 만들기
              </button>
            )}
          </div>
        </div>
      )}
      {isModalOpen && <CreateGroup onClose={() => setIsModalOpen(false)} />}
    </div>


      </div>
      {isPasswordModalOpen && (
        <PrivateGroupModal
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
      <div className="p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}  
          onPageChange={setCurrentPage}
        />
      </div>
      {isShowLogin && <NeedLoginToGuest onClick={handleLoginModal}/>}
    </div>
  );
}
