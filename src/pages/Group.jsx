import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { useSearchParams, useNavigate } from "react-router-dom";

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

const GROUP_PARAMS = "group";

const options = [
  { label: "최신순", value: "latest" },
  { label: "추억 많은 순", value: "mostPosted" },
  { label: "배지 많은 순", value: "mostBadge" },
  { label: "공감순", value: "mostLiked" }
];


export default function Group() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [myId, setMyId] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "mostLiked");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const navigate = useNavigate();
  const tabName = searchParams.get(GROUP_PARAMS) || "Public";
  const isPublic = tabName === "Public";
  const addToast = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await userService.getUserInfo();
        setMyId(userInfo.data.id);
      } catch {
        addToast("사용자 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };
  
    fetchUserInfo();
  }, []);
  
  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const response = await groupService.getGroupList({
          type: isPublic ? "public" : "private",
          sortBy,
          keyword: searchTerm,
          page: currentPage,
        });
    
        if (response.status === "success") {
          setGroupData(response.data.groups || []);
          setTotalPages(response.data.totalPage);
        } else {
          throw new Error("그룹 목록 조회 실패");
        }
      } catch {
        addToast("그룹 목록 조회에 실패했습니다.");
      }
    };
    

    fetchGroupList();
  }, [isPublic, searchTerm, sortBy, currentPage]);

  useEffect(() => {
    setSortBy(searchParams.get("sortBy") || "mostLiked");
  }, [searchParams]);
  
  const handleSearch = () => {
    console.log("검색어:", searchTerm);
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
      addToast("그룹 정보 조회 중 오류가 발생했습니다.");
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
        <SearchButton
          name="검색하기"
          onClick={handleSearch}
          className="h-full whitespace-nowrap font-medium"
        />
      </div>

      <div className="w-full mt-3 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groupData.length > 0 ? (
            groupData.map((group) =>
              isPublic ? (
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
              ) : (
              <PrivateGroupCard
                onClose={() => setIsPasswordModalOpen(false)}
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
              <p className="text-lg font-semibold">{isPublic ? "등록된 공개 그룹이 없습니다." : "등록된 비공개 그룹이 없습니다."}</p>
              <p className="text-sm text-gray-400">가장 먼저 그룹을 만들어보세요!</p>
              <button onClick={() => setIsModalOpen(true)}
                      className="mt-4 px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
                그룹 만들기
              </button>
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
    </div>
  );
}
