import { useNavigate } from "react-router-dom";

import commentIcon from "@/assets/icon/group/comment.svg";
import empathyIcon from "@/assets/image/logo-image.svg";

export default function PrivateGroupCard({ id, title, author, visibility, date, likes, comments }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div 
      onClick={handleClick} 
      className="hover:shadow-card w-[20vw] min-h-[180px] px-4 pb-4 pt-5 
                 bg-white border border-lightViolet rounded-lg cursor-default flex flex-col justify-between"
    >
      <div className="flex items-center text-darkerGray text-sm">
        <span className="font-medium">{author}</span>
        <span className="mx-2">|</span>
        <span>{visibility}</span>
      </div>

      <h3 className="text-black text-md font-medium mt-2 line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-darkGray-active mt-2">{date}</p>

      <div className="flex justify-end gap-4 items-center mt-auto text-sm text-black">
        <div className="flex items-center gap-1">
          <img src={commentIcon} alt="댓글" className="w-5 h-5" />
          <span>{comments}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={empathyIcon} alt="공감" className="w-5 h-5" />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
}
