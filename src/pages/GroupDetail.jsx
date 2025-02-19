import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/useToast";
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

import userService from "@/services/user/userService";
import defaultImage from '@/assets/icon/main/default-image.png';
import groupService from '@/services/group/groupService';
import groupInteractionService from "@/services/group/groupInteractionService";
import postService from '@/services/post/postService';
import SearchBar from "@/components/common/SearchBar";
import SearchButton from "@/components/common/SearchButton";
import Select from '@/components/common/Select';
import PublicPostCard from '@/components/group/PublicPostCard';
import Pagination from "@/components/common/Pagination";
import CreateMemory from "@/components/modal/CreateMemory";
import MoreOptionsModal from "@/components/modal/MoreOptionsModal";
import EditGroup from "@/components/modal/EditGroup";
import AddIcon from "@/assets/icon/group/add-memory.svg";
import LogoImage from "@/assets/image/logo-image.svg";
import MoreIcon from "@/assets/icon/group/more.svg";

export default function GroupDetail() {
  const { groupId } = useParams();
  const addToast = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "mostLiked");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [morePosition, setMorePosition] = useState({ x: 0, y: 0 });
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [group, setGroup] = useState(null);
  const [publicMemories, setPublicMemories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line
  const [myId, setMyId] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const GROUP_PARAMS = 'group';
  const tabName = searchParams.get(GROUP_PARAMS) || 'Public';

  const options = [
    { label: "최신순", value: "latest" },
    { label: "추억 많은 순", value: "mostPosted" },
    { label: "배지 많은 순", value: "mostBadge" },
    { label: "공감순", value: "mostLiked" }
  ];


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userService.getUserInfo();
        const userId = data.data.id;
        setMyId(userId);
        
        if (group?.members) {
          const member = group.members.find((member) => member.userId === userId);
          if (member) {
            setIsMember(true);
            setIsAdmin(member.role === "ADMIN");
          } else {
            setIsMember(false);
          }
        }
      } catch {
        addToast("사용자 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };
  
    fetchUserInfo();
  }, [group]);

  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        const data = await groupService.getGroupDetail(groupId);
        if (!data) {
          addToast("해당 그룹을 찾을 수 없습니다.");
          return;
        }
        setGroup(data);
      } catch {
        addToast("그룹 상세 조회에 실패했습니다.");
      }
    };
  
    const fetchPosts = async () => {
      try {
        const postList = await postService.getPostList({
          groupId,
          page: currentPage,
          pageSize: 10,
          sortBy,
          keyword: searchTerm,
          isPublic: tabName === "Public",
        });
    
        if (postList.status === "success" && postList.data) {
          setTotalPages(postList.data.totalPages);
    
          setPublicMemories(
            postList.data.data.map((post) => ({
              id: post.postId,
              groupId: post.groupId,
              author: post.author?.nickname || "알 수 없음",
              title: post.title || "제목 없음",
              content: post.content || "내용 없음",
              imageUrl: post.imageUrl ? `https://${post.imageUrl}` : null,
              location: post.location || "장소 정보 없음",
              moment: new Date(post.moment).toLocaleDateString("ko-KR"),
              createdAt: new Date(post.createdAt).toLocaleDateString("ko-KR"),
              likeCount: post.likeCount ?? 0,
              commentCount: post.commentCount ?? 0,
              tag: post.tag?.length ? post.tag : ["태그 없음"],
            }))
          );
        } else {
          setPublicMemories([]);
        }
      } catch {
        addToast("게시글 목록 조회에 실패했습니다.");
      }
    };
    
  
    if (groupId) {
      fetchGroupDetail();
      fetchPosts();
    }
  }, [groupId, currentPage, sortBy, searchTerm, tabName]);
  

  useEffect(() => {
    setSortBy(searchParams.get("sortBy") || "mostLiked");
  }, [searchParams]);

  const handleSearch = async () => {
    try {
      const data = await groupService.searchGroups(searchTerm);
      setGroup(data.data || []);
    } catch {
      addToast("그룹 검색에 실패했습니다.");
    }
  };
  
  const handleSelect = (selectedValue) => {
    if (selectedValue !== sortBy) {
      setSortBy(selectedValue);
      setSearchParams({ sortBy: selectedValue, group: tabName }, { replace: true });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMoreClick = (event) => {
    event.preventDefault();
    setIsMoreOpen(true);
    setMorePosition({ x: event.clientX, y: event.clientY });
  };

  const handleCloseMore = () => {
    setIsMoreOpen(false);
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await groupService.deleteGroup(groupId);
      addToast("그룹이 삭제되었습니다.");
      navigate(`/group`); 
    } catch {
      console.log("게시글 삭제에 실패했습니다.");
    }
  };

  const handleJoinGroup = async () => {
    try {
      await groupInteractionService.joinGroup(groupId);
      addToast("그룹에 성공적으로 참여했습니다.");
      
      const updatedGroup = await groupService.getGroupDetail(groupId);
      setGroup(updatedGroup);
    } catch (error) {
      addToast(error.message || "그룹 참여 중 오류가 발생했습니다.");
    }
  };

  const handleLeaveGroup = async () => {
    if (!window.confirm("정말 그룹을 떠나시겠습니까?")) return;
  
    try {
      await groupInteractionService.leaveGroup(groupId);
      addToast("그룹을 떠났습니다.");
      setIsMember(false);
  
      const updatedGroup = await groupService.getGroupDetail(groupId);
      setGroup(updatedGroup);
    } catch (error) {
      addToast(error.message || "그룹 떠나기 중 오류가 발생했습니다.");
    }
  };

  
  return (
    <div className="w-full max-w-[1200px] mx-auto py-3">
      <div className="flex flex-col md:flex-row p-6 relative">
        <img 
          className="w-[180px] h-[180px] rounded-lg object-cover"
          src={group?.imageUrl ? `https://${group.imageUrl}` : defaultImage} 
          alt="그룹 이미지" 
        />

        <div className="flex-1 ml-6 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-black">{group?.dday || "D+0"}</span>
            <span className="text-sm text-darkGray-active">| {group?.isPublic ? "공개" : "비공개"}</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-black">{group?.groupName || "그룹 이름"}</h1>
            <p className="text-sm text-darkerGray">{group?.groupDescription || "그룹 설명이 없습니다."}</p>
            </div>

            <div className="space-y-2">
              <h1 className="mt-5 font-semibold text-base text-darkerGray ml-1">획득배지</h1>
              <div className="mt-1 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-darkWhite text-sm px-3 py-1 rounded-full">👾 7일 연속 추억 등록</span>
                  <span className="bg-darkWhite text-sm px-3 py-1 rounded-full">🌼 그룹 공감 1만 개 이상 받기</span>
                  <span className="bg-darkWhite text-sm px-3 py-1 rounded-full">💖 추억 공감 1만 개 이상 받기</span>
                </div>
                
              <div className="flex space-x-4 mt-3 md:mt-0">
              {isMember && !isAdmin ? (
                <button 
                  className="px-5 py-2 whitespace-nowrap w-[110px] text-white bg-normalGray hover:bg-normalGray-hover active:bg-normalGray-active rounded-lg"
                  onClick={handleLeaveGroup}
                >
                  떠나기
                </button>
              ) : !isMember ? (
                <button 
                  className="px-5 py-2 whitespace-nowrap w-[110px] text-white bg-black hover:bg-black-hover active:bg-black-active rounded-lg"
                  onClick={handleJoinGroup}
                >
                  참여하기
                </button>
              ) : null} 
                <button className="flex items-center w-[150px] whitespace-nowrap px-5 py-2 bg-white hover:bg-background active:bg-darkWhite border rounded-lg">
                  <img src={LogoImage} alt="공감 아이콘" className="w-5 h-5 mr-2" />
                  공감 보내기
                </button>
              </div>
              </div>
            </div>
        </div>
        {isAdmin && (
        <button className="absolute top-4 right-4" onClick={handleMoreClick}>
          <img src={MoreIcon} alt="더보기" />
        </button>)}
      </div>

      {isModalOpen && <CreateMemory onClose={() => setIsModalOpen(false)} />}
      {isMoreOpen && <MoreOptionsModal position={{ x: morePosition.x - 40, y: morePosition.y }} onClose={handleCloseMore} itemId={group.groupId} onEdit={() => setShowEditGroup(true)} onDelete={handleDeleteGroup}/>}
      {showEditGroup && <EditGroup onUpdate={(updatedGroup) => setGroup(updatedGroup)} onClose={() => setShowEditGroup(false)} />}
        
      <div className="my-[70px] border-t border-gray-200"></div>

      <div>
                
      <div className="flex gap-3 justify-start items-center mb-3">
          <h2 className="text-2xl font-semibold text-black">
            <span className="text-darkViolet">달봉이네 가족</span>의 추억 목록
          </h2>
          <button onClick={() => setIsModalOpen(true)}>
            <img src={AddIcon} alt="추억 추가" />
          </button>
          
        </div>

        <div className="flex mt-4 items-center gap-5">
          <Select options={options} onSelect={handleSelect} value={sortBy} />
         
          <SearchBar
            name="search"
            placeholder="그룹 이름을 검색해 주세요."
            width="w-full"
            height="h-12"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onEnter={handleSearch} 
          />
          <SearchButton
            name="검색하기"
            onClick={handleSearch} 
            className="h-full whitespace-nowrap font-medium"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {publicMemories.map((memory) => 
                <PublicPostCard key={memory.id} groupId={groupId} {...memory} />
           )}
        </div>

        <div className="p-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
