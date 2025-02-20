import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import PublicPostCard from "@/components/group/PublicPostCard.jsx";
import ProfileEditCard from "@/components/mypage/ProfileEditCard.jsx";
import MemoryAction from "@/components/main/MemoryAction.jsx";
import GroupCard from "@/components/mypage/GroupCard.jsx";
import Reply from "@/components/mypage/Reply.jsx";
import EditProfile from "@/components/modal/EditProfile.jsx";
import PassWordChange from "@/components/modal/PasswordChange.jsx";

import userService from "@/services/user/userService";

import NoArticleIcon from "@/assets/icon/main/edit.svg";
import defaultComment from "@/assets/icon/group/no-comment.svg";
import ArrowLeftIcon from "@/assets/icon/mypage/arrow-left.svg";
import ArrowRightIcon from "@/assets/icon/mypage/arrow-right.svg";

import { useToast } from "@/hooks/useToast";
import { smoothScroll } from "@/utils/scrollSmooth.js";

export default function Mypage() {
  const articlescrollRef = useRef(null);
  const replyScrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nickname, setNickname] = useState("예비 사용자");
  const [isTimeoutPassed, setIsTimeoutPassed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondeModalVisible, setSecondeModalVisible] = useState(false);
  const [publicMemories, setPublicMemories] = useState([]);
  const [repliyDatas, setRepliyDatas] = useState([]);
  const addToast = useToast();
  const navigate = useNavigate();
  const handleViewAllPosts = () => {
    navigate("/mypage/posts");
  };
  
  const handleViewAllComments = () => {
    navigate("/mypage/comments");
  };
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userService.getUserInfo();
        setNickname(data.data.nickname);
      } catch {
        addToast("사용자 정보를 불러올 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();

    const timeout = setTimeout(() => {
      setIsTimeoutPassed(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
      const fetchMyPosts = async () => {
        try {
          const response = await userService.getMyPosts(1, 5); 
          const posts = response?.data?.posts || [];
    
          if (posts.length === 0) {
            setPublicMemories([]);
            return;
          }
    
          setPublicMemories(
            posts.map((post) => ({
              postId: post.postId || null,
              title: post.title || "제목 없음",
              content: post.content || "내용 없음",
              tags: Array.isArray(post.tag) ? post.tag : [], 
              moment: post.moment
                ? new Date(post.moment).toLocaleDateString("ko-KR")
                : "날짜 없음",
              createdAt: post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("ko-KR")
                : "날짜 없음",
              likeCount: post.likeCount || 0,
              commentCount: post.commentCount || 0,
              author: post.author?.nickname || "알 수 없음",
              groupName: post.group?.groupName || "그룹 없음",
              isPublic: post.group?.isPublic ?? true,
            }))
          );
        } catch (error) {
          console.error("내가 작성한 글 불러오기 실패:", error);
          addToast("내가 작성한 글을 불러오는 데 실패했습니다.");
        }
      };
    
  
    const fetchMyComments = async () => {
      try {
        const data = await userService.getMyComments(1, 5);
        const comments = data?.data?.comments || [];
  
        if (comments.length === 0) {
          setRepliyDatas([]);
          return; 
        }
  
        setRepliyDatas(
          comments.map((comment) => ({
            title: comment.post?.title || "제목 없음",
            content: comment.content || "내용 없음",
          }))
        );
      } catch (error) {
        console.error("내가 작성한 댓글 불러오기 실패:", error);
        if (error.response?.status !== 200) {
          addToast("내가 작성한 댓글을 불러오는 데 실패했습니다.");
        }
      }
    };
  
    fetchMyPosts();
    fetchMyComments();
  }, []);

  if (isLoading || !isTimeoutPassed) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner size={200} />
      </div>
    );
  }

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleVerfiyChange = () => {
    setModalVisible(false);
    setSecondeModalVisible(true);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner size={200} />
      </div>
    );
  }
  
  return (
    <div className="w-full h-full pt-3 pb-7">
      <div className="flex items-center mb-6">
        <span className="text-darkViolet text-2xl font-semibold">{nickname}</span>
        <span className="text-black text-2xl font-semibold">님, 안녕하세요!</span>
      </div>

      <div className="flex gap-10 max-w-[93%]">
        <ProfileEditCard onClickEdit={handleEdit} />
        <MemoryAction />
        <GroupCard />
      </div>

      {/* 작성한 글 */}
      <div className="flex justify-between items-center mt-7 w-[98%]">
        <p className="text-base font-semibold">작성한 글 모음</p>
        <button onClick={handleViewAllPosts} className="text-darkGray hover:text-darkGray-hover active:text-darkGray-active font-semibold text-xs">
          전체보기
        </button>
      </div>

      <div className="w-full h-auto flex mt-3 relative">
        {publicMemories.length > 4 && (
          <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 left-0 pl-4 pr-4">
            <img className="cursor-pointer" src={ArrowLeftIcon} onClick={() => smoothScroll(articlescrollRef, -300)} />
          </div>
        )}
        <div ref={articlescrollRef} className="max-w-[85vw] overflow-x-auto scroll-smooth hide-scrollbar h-full">
          {publicMemories.length > 0 ? (
            <div className="grid grid-flow-col gap-3 w-max">
              {publicMemories.map((memory, index) => (
                <PublicPostCard key={index} id={index + 1} group={1} {...memory} />
              ))}
            </div>
          ) : (
        <div className="flex flex-col w-[85vw] items-center bg-white rounded-lg justify-center min-h-[30vh] text-center text-gray-500">
          <img src={NoArticleIcon} alt="No Articles" className="w-30 h-30 mb-8" />
          <p className="text-lg font-semibold mt-4">최근에 내가 작성한 추억글이 없습니다.</p>
          <p className="text-sm mt-2">조각집에 참여하고 추억글을 작성해보세요!</p>
        </div>
          )}
        </div>
        {publicMemories.length > 4 && (
          <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 right-[3%] pl-4 pr-4">
            <img className="cursor-pointer" src={ArrowRightIcon} onClick={() => smoothScroll(articlescrollRef, 300)} />
          </div>
        )}
      </div>

      {/* 작성한 댓글 */}
      <div className="flex justify-between items-center mt-7 max-w-[98%]">
        <p className="text-base font-semibold">작성한 댓글 모음</p>
        <button onClick={handleViewAllComments} className="text-darkGray hover:text-darkGray-hover active:text-darkGray-active font-semibold text-xs">
          전체보기
        </button>
      </div>

      <div className="w-full h-auto flex mt-3 relative">
        {repliyDatas.length > 4 && (
          <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 left-0 pl-4 pr-4">
            <img className="cursor-pointer" src={ArrowLeftIcon} onClick={() => smoothScroll(replyScrollRef, -300)} />
          </div>
        )}
        <div ref={replyScrollRef} className="max-w-[85vw] overflow-x-auto scroll-smooth hide-scrollbar h-full">
          {repliyDatas.length > 0 ? (
            <div className="grid grid-flow-col gap-3 w-max">
              {repliyDatas.map((reply, index) => (
                <Reply key={index} title={reply.title} content={reply.content} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col py-9 w-[85vw] items-center bg-white rounded-lg justify-center text-center text-gray-500 mt-9">
              <img src={defaultComment} alt="작성한 댓글 없음" className="w-30 h-auto" />
              <p className="text-lg font-semibold mt-7">작성한 댓글이 없습니다.</p>
              <p className="text-sm mt-2">추억 글에 댓글을 등록해 보세요!</p>
            </div>
          )}
        </div>
        {repliyDatas.length > 4 && (
          <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 right-[3%] pl-4 pr-4">
            <img className="cursor-pointer" src={ArrowRightIcon} onClick={() => smoothScroll(replyScrollRef, 300)} />
          </div>
        )}
      </div>


      {isModalVisible && (
        <EditProfile id={"gildeong32"} nickname={"홍길동"} onClose={() => setModalVisible(false)} onVerfiyChange={handleVerfiyChange} />
      )}
      {isSecondeModalVisible && <PassWordChange onClose={() => setSecondeModalVisible(false)} />}
    </div>
  );
}
