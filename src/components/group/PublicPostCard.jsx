import { useNavigate } from 'react-router-dom';

import defaultImage from '@/assets/icon/main/default-image.png';
import empathyIcon from "@/assets/image/logo-image.svg";
import commentIcon from "@/assets/icon/group/comment.svg";

export default function PublicPostCard({ 
  id,
  title,
  author, 
  groupId, 
  location,
  moment, 
  tag = [],
  imageUrl,
  likeCount,
  commentCount
}) {
  const truncateText = (text, maxLength) => 
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id || !groupId) {
      console.error("Invalid ID or groupId:", { id, groupId });
      return;
    }
    navigate(`/group/${groupId}/post/${id}`); 
  };

  return (
    <div onClick={handleClick} className="cursor-default hover:shadow-card w-[20vw] border border-lightGray bg-white rounded-lg overflow-hidden">
      
      <img src={imageUrl || defaultImage} className="w-full h-48 object-cover" alt="추억 이미지" />

      <div className="p-4 space-y-2">
        <div className="flex items-center text-darkerGray text-sm">
          <span className="font-medium">{author || "알 수 없음"}</span>
        </div>

        <p className="text-black-active text-md font-medium leading-tight">
          {truncateText(title, 35)}
        </p>

        <div className="text-xs text-darkGray-hover flex flex-wrap gap-1">
          {tag.length > 0 ? (
            tag.map((tag, index) => (
              <span key={index} className="whitespace-nowrap">#{tag}</span>
            ))
          ) : (
            <span className="text-gray-400">태그 없음</span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-darkGray-active mt-2">
          <span>{location} · {moment}</span>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <img className="w-4 h-4" src={empathyIcon} alt="공감" /> {likeCount}
            </span>
            <span className="flex items-center gap-1">
              <img className="w-4 h-4" src={commentIcon} alt="댓글" /> {commentCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
