import { useState } from "react";
import { useParams } from "react-router-dom";

import { MapPinIcon, CalendarIcon } from "@heroicons/react/24/solid";
import CommentSection from "@/components/group/Comment.jsx";
import MoreOptionsModal from "@/components/modal/MoreOptionsModal";
import EditMemory from "@/components/modal/EditMemory";

import empathyIcon from "@/assets/image/logo-image.svg";
import commentIcon from "@/assets/icon/group/comment.svg";
import moreIcon from "@/assets/icon/group/more.svg";
import ScrapIcon from "@/assets/icon/group/bookmark-fill.svg?react";

export default function MemoryPost() {
  const { postId } = useParams();
  const [isBookmark, setIsBookmark] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [morePosition, setMorePosition] = useState({ x: 0, y: 0 });
  const [showEditMemory, setShowEditMemory] = useState(false);
  const [comments] = useState("");
  
  const handleMoreClick = (event) => {
    event.preventDefault();
    setIsMoreOpen(true);
    setMorePosition({ x: event.clientX, y: event.clientY });
  };

  const handleCloseMore = () => {
    setIsMoreOpen(false);
  };

  const handleBookMark = () => {
    // id값으로 api 요청로직 추가해야 함.
    setIsBookmark(!isBookmark);
  }

  const post = {
    1: {
      author: "달봉이아들",
      visibility: "공개",
      title: "인천 앞바다에서 무려 60cm 월척을 낚다!",
      hashtags: ["#추억스타그램", "#낚시"],
      location: "인천 앞바다",
      date: "24.01.19",
      likes: 120,
      comments: 8,
      image: "https://placehold.co/800x500",
      content: `인천 앞바다에서 월척을 낚았습니다!\n가족들과 기억에 오래도록 남을 멋진 하루였어요.`,
    },
    2: {
      author: "달봉이아들",
      visibility: "공개",
      title: "인천 앞바다에서 또다른 멋진 순간!",
      hashtags: ["#여행", "#추억"],
      location: "인천 앞바다",
      date: "24.02.01",
      likes: 98,
      comments: 8,
      image: "https://placehold.co/800x500",
      content: `추억에 남는 순간이었어요!`,
    },
  };

  const selectedPost = post[postId] || post[1];

  const iconStyle = "size-7 cursor-pointer";

  return (
    <div className="w-full max-w-[900px] mx-auto pt-6 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center text-sm space-x-2">
            <span className="text-black-active font-semibold">{selectedPost.author}</span>
            <span className="text-darkGray-active">| {selectedPost.visibility}</span>
          </div>
          <h1 className="text-2xl font-bold mt-2">{selectedPost.title}</h1>
          <div className="flex space-x-2 my-4">
            {selectedPost.hashtags.map((tag, index) => (
              <span key={index} className="bg-lightGray text-darkerGray text-sm px-3 py-1 rounded-md">
                {tag}
              </span>
            ))}
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

        
        {isMoreOpen && <MoreOptionsModal position={{ x: morePosition.x - 40, y: morePosition.y }} onClose={handleCloseMore} onEdit={() => setShowEditMemory(true)} />}
        {showEditMemory  && <EditMemory onClose={() => setShowEditMemory(false)} />}
      </div>

      <div className="mt-4 flex items-center text-darkGray-active text-sm">
        <div className="flex space-x-2">
          <span className="flex gap-1">
            <MapPinIcon className="w-5 h-5 text-gray-500" />
            {selectedPost.location}
          </span>
          <span className="text-darkGray-hover">·</span>
          <span className="flex gap-1">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            {selectedPost.date}
          </span>
        </div>

        <div className="ml-6 flex space-x-2">
          <div className="flex items-center space-x-1">
            <img src={empathyIcon} alt="공감" className="w-5 h-5" />
            <span>{selectedPost.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <img src={commentIcon} alt="댓글" className="w-5 h-5" />
            <span>{selectedPost.comments}</span>
          </div>
        </div>
      </div>

      <div className="mb-[70px] mt-10 border-t border-darkWhite"></div>

      <img src={selectedPost.image} alt="게시글 이미지" className="w-full h-auto mt-6 rounded-lg" />

      <p className="mt-6 text-black-active leading-relaxed whitespace-pre-line">{selectedPost.content}</p>

      <div className="mt-[70px] mb-[40px] border-t border-darkWhite"></div>

      <CommentSection comments={comments} postId={postId} />
    </div>
  );
}
