import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { motion, AnimatePresence } from "framer-motion";

import postService from "@/services/post/postService";
import scrapService from "@/services/scrap/scrapService";
import defaultImage from '@/assets/icon/main/default-image.png';
import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/solid";
import CommentSection from "@/components/group/Comment.jsx";
import MoreOptionsModal from "@/components/modal/MoreOptionsModal";
import EditMemory from "@/components/modal/EditMemory";

import empathyIcon from "@/assets/image/logo-image.svg";
import commentIcon from "@/assets/icon/group/comment.svg";
import LogoImage from "@/assets/image/logo-image.svg";
import moreIcon from "@/assets/icon/group/more.svg";
import ScrapIcon from "@/assets/icon/group/bookmark-fill.svg?react";
import postInteractionService from "@/services/post/postInteractionService";

export default function MemoryPost() {
  const { groupId, postId } = useParams();
  const addToast = useToast();
  const navigate = useNavigate();
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [morePosition, setMorePosition] = useState({ x: 0, y: 0 });
  const [showEditMemory, setShowEditMemory] = useState(false);
  const [post, setPost] = useState(null);
  const [comments] = useState("");

  useEffect(() => {
    const fetchScrapStatus = async () => {
      try {
        const response = await scrapService.checkScrapStatus(postId);
        setIsBookmark(response.data.isScrapped);
      } catch {
        addToast("스크랩 여부 조회에 실패했습니다.");
      }
    };
  
    if (postId) {
      fetchScrapStatus();
    }
  }, [postId]);
  
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await postService.getPostDetail(postId);
        if (response.status === "success" && response.data) {
          setPost(response.data);
        }
      } catch {
        addToast("게시글 상세 조회에 실패했습니다");
      }
    };

    if (postId) {
      fetchPostDetail();
    }
  }, [postId]);

  const handleMoreClick = (event) => {
    event.preventDefault();
    setIsMoreOpen(true);
    setMorePosition({ x: event.clientX, y: event.clientY });
  };

  const handleLikePost = async () => {
    try {
      await postInteractionService.likePost(postId);
      setPost((prevPost) => ({
        ...prevPost,
        likeCount: prevPost.likeCount + 1,
      }));
      addToast("게시글에 공감했습니다!");
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
  

  const handleCloseMore = () => {
    setIsMoreOpen(false);
  };

  const handleBookMark = async () => {
    try {
      const response = await postInteractionService.toggleScrap(postId);
      
      if (response.status === "success") {
        if (response.message === "스크랩이 완료되었습니다.") {
          setIsBookmark(true);
        } else if (response.message === "스크랩이 취소되었습니다.") {
          setIsBookmark(false);
        }
      }
    } catch {
      addToast("북마크 추가/삭제에 실패했습니다.");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId);
      addToast("게시글이 삭제되었습니다.");
      navigate(`/group/${groupId}`); 
    } catch {
      addToast("게시글 삭제에 실패했습니다.");
    }
  };

  const iconStyle = "size-7 cursor-pointer";

  if (!post) {
    return <div className="text-center text-darkGray">게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div className="w-full max-w-[900px] mx-auto pt-6 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center text-sm space-x-2">
            <span className="text-black-active font-semibold pl-1">{post.nickname}</span>
          </div>
          <h1 className="text-2xl font-bold mt-3">{post.title}</h1>
          <div className="flex space-x-2 my-3">
          <div className="flex space-x-2 my-2">
            {post.tag?.length > 0 ? (
              post.tag.map((tag, index) => (
                <span key={index} className="bg-lightGray text-darkerGray text-sm px-3 py-1 rounded-md">
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400">태그 없음</span>
            )}
          </div>

          </div>
        </div>
        <div className="flex items-center gap-2">
          <ScrapIcon
              onClick={handleBookMark}
              className={`${iconStyle} ${isBookmark ? "fill-normalViolet stroke-normalViolet" : " stroke-darkGray-active [&>path:first-child]:fill-none"}`}
          />
          <button>
            <img src={moreIcon} alt="더보기" className="w-6 h-6" onClick={handleMoreClick} />
          </button>
        </div>
        {isMoreOpen &&
          <MoreOptionsModal 
             position={{ x: morePosition.x - 40, y: morePosition.y }} 
             onClose={handleCloseMore}
             onEdit={() => setShowEditMemory(true)}
             onDelete={handleDeletePost}
             itemId={post.postId}
          />}
        {showEditMemory && (
          <EditMemory 
            post={post}
            onClose={() => setShowEditMemory(false)}
            onUpdate={(updatedPost) => setPost(updatedPost)}
          />
        )}
      </div>

      <div className="mt-4 flex justify-between items-center text-darkGray-active text-sm">
        <div className="flex justify-between">
        <div className="flex space-x-2">
          <span className="flex gap-1">
            <MapPinIcon className="w-5 h-5 text-gray-500" />
            {post.location}
          </span>
          <span className="text-darkGray-hover">·</span>
          <span className="flex gap-1">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            {new Date(post.moment).toISOString().split("T")[0]}
          </span>
        </div>

        <div className="ml-6 flex space-x-2">
          <div className="flex items-center space-x-1">
            <img src={empathyIcon} alt="공감" className="w-5 h-5" />
            <span>{post.likeCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <img src={commentIcon} alt="댓글" className="w-5 h-5" />
            <span>{post.commentCount}</span>
          </div>
        </div>
      </div>
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
      <button onClick={handleLikePost}  className="flex items-center w-[150px] whitespace-nowrap pl-5 pr-4 py-2 bg-white hover:bg-background active:bg-darkWhite border rounded-lg">
      <img src={LogoImage} alt="공감 아이콘" className="w-5 h-5 mr-2" />
            공감 보내기
       </button>

      </div>
      <div className="mb-[70px] mt-10 border-t border-darkWhite"></div>
            
      <img 
        src={post.imageUrl ? `https://${post.imageUrl}` : defaultImage} 
        alt="게시글 이미지" 
        className="w-[70%] h-auto mt-6 rounded-lg" 
      />


      <p className="mt-6 text-black-active leading-relaxed whitespace-pre-line">{post.content}</p>

      <div className="mt-[70px] mb-[40px] border-t border-darkWhite"></div>

      <CommentSection comments={comments} postId={postId} />
    </div>
  );
}
