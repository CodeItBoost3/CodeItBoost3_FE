import { useState, useEffect } from 'react';
import { IoRefresh } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/useToast";
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

import Alert from '@/components/modal/Alert';
import DeleteIcon from "@/assets/icon/mypage/delete.svg";
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
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");
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
  const [searching, setSearching] = useState(false);
  const [isSearching, setIsSearching] = useState(false); 
  const GROUP_PARAMS = 'group';
  const tabName = searchParams.get(GROUP_PARAMS) || 'Public';
  const [floatingIcons, setFloatingIcons] = useState([]);

  const options = [
    { label: "최신순", value: "latest" },
    { label: "추억 많은 순", value: "mostPosted" },
    { label: "배지 많은 순", value: "mostBadge" },
    { label: "공감순", value: "mostLiked" }
  ];
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: () => {},
    onCancel: () => setAlertConfig((prev) => ({ ...prev, isOpen: false })),
  });
  const getBadgeIcon = (badgeType) => {
    if (badgeType.startsWith("LIKE_")) return "❤️";
    if (badgeType.startsWith("MEMBER_")) return "👥"; 
    if (badgeType.startsWith("MEMORY_")) return "📸"; 
    return "🏆";
  };
  

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
    fetchGroupDetail();
    fetchPosts();
  }, [groupId]); 
  
  const fetchPosts = async () => {
    try {
      const postList = await postService.getPostList({
        groupId,
        page: currentPage,
        pageSize: 10,
        sortBy, // ✅ 정렬 옵션 적용
        keyword: searchTerm.trim(), // ✅ 검색어 반영
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
  
  useEffect(() => {
    setSortBy(searchParams.get("sortBy") || "mostLiked");
  }, [searchParams]);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setSearching(false);
      setCurrentPage(1);
      setPublicMemories([]); 
      fetchPosts(); 
      return;
    }
  
    setIsSearching(true);
  };

  const handleRefresh = async () => {
    setSearchTerm(""); 
    setCurrentPage(1);
    setSortBy("mostLiked");
    setSearchParams({ sortBy: "mostLiked", group: tabName }, { replace: true });
  
    setIsSearching(false);
    setSearching(false);
    setPublicMemories([]); 
  
    try {
      const postList = await postService.getPostList({
        groupId,
        page: 1,
        pageSize: 10,
        sortBy: "mostLiked",
        keyword: "", 
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
      addToast("게시글 목록을 불러오는 데 실패했습니다.");
    }
  };
  

useEffect(() => {
  if (!groupId || !isSearching) return;

  const fetchSearchResults = async () => {
    setSearching(true);

    try {
      const postList = await postService.getPostList({
        groupId,
        page: currentPage,
        pageSize: 10,
        sortBy,
        keyword: searchTerm.trim(), 
        isPublic: tabName === "Public",
      });

      if (postList.status === "success" && postList.data) {
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
      addToast("게시글 검색에 실패했습니다.");
    } finally {
      setSearching(false);
      setIsSearching(false); 
    }
  };

  fetchSearchResults();
}, [isSearching]); 

const handleLikeGroup = async () => {
  try {
    await groupInteractionService.likeGroup(groupId);
    setGroup((prevGroup) => ({
      ...prevGroup,
      likeCount: prevGroup.likeCount + 1,
    }));
    addToast("그룹에 공감했습니다!");
    setFloatingIcons((prev) => [
      ...prev,
      { id: Date.now(), x: Math.random() * (30 - 25) + 25 }
    ]);

    setTimeout(() => {
      setFloatingIcons((prev) => prev.slice(1));
    }, 1500);
  } catch {
    addToast("공감 추가 중 오류가 발생했습니다.");
  }
};
  
const handleSelect = (selectedValue) => {
  if (selectedValue !== sortBy) {
    setSortBy(selectedValue);
    setSearchParams({ sortBy: selectedValue, group: tabName }, { replace: true });

    fetchPosts();
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
    setAlertConfig({
      isOpen: true,
      title: "그룹 떠나기",
      message: "정말 그룹을 떠나시겠습니까?",
      confirmText: "떠나기",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await groupInteractionService.leaveGroup(groupId);
          addToast("그룹을 떠났습니다.");
          setIsMember(false);
          const updatedGroup = await groupService.getGroupDetail(groupId);
          navigate("/group");
          setGroup(updatedGroup);
        } catch (error) {
          addToast(error.message || "그룹 떠나기 중 오류가 발생했습니다.");
        } finally {
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleDeleteGroupImage = async () => {
    if (!group?.groupId) return;

    setAlertConfig({
      isOpen: true,
      title: "그룹 이미지 삭제",
      message: "정말 그룹 이미지를 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await groupService.deleteGroupImage(group.groupId);
          addToast("그룹 이미지가 삭제되었습니다.");
          const updatedGroup = await groupService.getGroupDetail(group.groupId);
          setGroup(updatedGroup);
        } catch {
          addToast("그룹 이미지 삭제에 실패했습니다.");
        } finally {
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };
  
  const decodeImageUrl = (url) => {
    try {
      return decodeURIComponent(url);
    } catch (error) {
      console.error("URL 디코딩 실패:", error);
      return url; 
    }
  };
  
  const decodedImageUrl = group?.imageUrl ? decodeImageUrl(group.imageUrl) : null;

  useEffect(() => {
    fetchPosts();
  }, [groupId, sortBy, searchTerm, isSearching]);
  
  
  return (
    <div className="w-full max-w-full mx-auto py-3">
      <div className="flex flex-col md:flex-row p-6 relative">
        <img 
          className="w-[180px] h-[180px] rounded-lg object-cover"
          src={group?.imageUrl ? `https://d1up383l0okfvw.cloudfront.net/${decodedImageUrl}` : defaultImage} 
          alt="그룹 이미지" 
        />
          {isAdmin && group?.imageUrl && (
            <button
              className="absolute top-4 left-[180px] bg-red-200 text-white p-1 rounded-full flex items-center justify-center"
              onClick={handleDeleteGroupImage}
            >
              <img src={DeleteIcon} alt="이미지 삭제" className="w-5 h-5" />
            </button>
          )}
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
              <h1 className="mt-5 font-semibold text-base text-darkerGray ml-1">획득 배지</h1>
              <div className="mt-1 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-wrap gap-2">
                {group?.badges?.length > 0 ? (
                  group.badges.map((badge) => (
                    <span key={badge.badgeType} className="bg-darkWhite text-sm px-3 py-1 rounded-full flex items-center">
                      {getBadgeIcon(badge.badgeType)} {badge.badgeName}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">획득한 배지가 없습니다.</span>
                )}
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
                  <AnimatePresence>
                  {floatingIcons.map((icon) => (
                    <motion.img
                      key={icon.id}
                      src={LogoImage}
                      alt="공감 아이콘"
                      className="absolute w-5 h-5"
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -60, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      style={{ left: `${50 + icon.x}%`, transform: "translateX(-50%)" }}
                    />
                  ))}
                </AnimatePresence>
                <button onClick={handleLikeGroup} className="flex items-center w-[150px] whitespace-nowrap px-5 py-2 bg-white hover:bg-background active:bg-darkWhite border rounded-lg">
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

      {/* 검색 바 & 새로고침 버튼 */}
      <div className="flex mt-4 items-center gap-5">
        <Select options={options} onSelect={handleSelect} value={sortBy} />
      
        <SearchBar
          name="search"
          placeholder="게시글을 검색해 주세요."
          width="w-full"
          height="h-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onEnter={handleSearch}
        />

        {searchTerm && (
          <button onClick={handleRefresh} className="p-2 text-gray-500 font-bold hover:text-black">
            <IoRefresh size={28} />
          </button>
        )}

        <SearchButton
          name="검색하기"
          onClick={handleSearch}
          className="h-full whitespace-nowrap font-medium"
        />
      </div>


        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {searching ? (
          <p className="text-center w-full col-span-4">검색 중...</p>
        ) : publicMemories.length > 0 ? (
          publicMemories.map((memory) => (
            <PublicPostCard key={memory.id} groupId={groupId} {...memory} />
          ))
        ) : (
          <p className="text-center w-full col-span-4">검색 결과가 없습니다.</p>
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
      <Alert {...alertConfig} />
    </div>
  );
}
