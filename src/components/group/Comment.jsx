import { useState } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid"; 

import userProfile from "@/assets/icon/group/default-profile.svg";
import EditIcon from "@/assets/icon/group/comment-edit.svg";
import DeleteIcon from "@/assets/icon/group/comment-delete.svg";
import defaultComment from "@/assets/icon/group/no-comment.svg";

function Comment({ comment }) {
    return (
      <div className="flex items-start space-x-3 py-3 border-t border-gray-200">
        <img src={comment.profile} alt="프로필" className="w-8 h-8 rounded-full" />
        <div className="flex-1">
          <span className="text-sm font-semibold">{comment.author}</span>
          <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
        </div>
        <div className="flex flex-col gap-2 items-end justify-between">
          <span className="text-xs text-darkGray-active">{comment.date}</span>
          <div className="flex gap-2 mt-1">
             {/* 내가 작성한 댓글인 경우에만 수정, 삭제 가능 */}
            <img src={EditIcon} alt="수정" className="w-4 h-4 cursor-pointer" />
            <img src={DeleteIcon} alt="삭제" className="w-4 h-4 cursor-pointer" />
          </div>
        </div>
      </div>
    );
}

export default function CommentSection() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, profile: userProfile, author: "홍길동", content: "우와 60cm이라니..!! 저도 가족들과 가봐야겠어요~", date: "24.01.18 21:50" },
    { id: 2, profile: userProfile, author: "다람이네가족", content: "정말 멋진 경험이었겠어요!", date: "24.01.18 22:10" },
  ]);
  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    
    const newCommentObj = {
      id: comments.length + 1,
      profile: userProfile, 
      author: "사용자",
      content: newComment,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleCommentSubmit();
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto mt-6">

      <div className="flex items-center space-x-3 border border-gray-300 rounded-full px-4 py-2 focus-within:normalViolet focus-within:ring-2 focus-within:ring-normalViolet transition">
        <input
          type="text"
          placeholder="내용을 입력해주세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent flex-1 outline-none text-darkerGray focus:ring-0 focus:outline-none"
        />
        <button onClick={handleCommentSubmit}>
          <PaperAirplaneIcon className="w-6 h-6 text-darkerGray" />
        </button>
      </div>

      <div className="my-8">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-darkGray mt-9">
            <img src={defaultComment} alt="등록된 댓글 없음" className="w-30 h-auto" />
            <p className="text-lg font-semibold mt-4">등록된 댓글이 없습니다.</p>
            <p className="text-sm mt-2">가장 먼저 댓글을 등록해 보세요!</p>
          </div>
        ) : (
          comments.map((comment) =><Comment key={comment.id} comment={comment} />)
        )}
      </div>
    </div>
  );
}
