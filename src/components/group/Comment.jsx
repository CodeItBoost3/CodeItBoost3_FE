import { useState, useEffect } from "react";
import commentService from "@/services/comment/commentService";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useToast } from "@/hooks/useToast";

import userProfile from "@/assets/icon/group/default-profile.svg";
import EditIcon from "@/assets/icon/group/comment-edit.svg";
import DeleteIcon from "@/assets/icon/group/comment-delete.svg";
import defaultComment from "@/assets/icon/group/no-comment.svg";

function Comment({ comment, onEdit, onDelete }) {
  return (
    <div className="flex items-start space-x-3 py-3 border-t border-gray-200">
      <img src={comment.profile || userProfile} alt="프로필" className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <span className="text-sm font-semibold">{comment.author}</span>
        <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
      </div>
      <div className="flex flex-col gap-2 items-end justify-between">
        <span className="text-xs text-darkGray-active">{comment.date}</span>
        <div className="flex gap-2 mt-1">
          <img src={EditIcon} alt="수정" className="w-4 h-4 cursor-pointer" onClick={() => onEdit(comment)} />
          <img src={DeleteIcon} alt="삭제" className="w-4 h-4 cursor-pointer" onClick={() => onDelete(comment.id)} />
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({ postId }) {
  const addToast = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentService.getCommentsByPost(postId);
        console.log("API 응답:", response);
        if (Array.isArray(response)) {
          setComments(response);
        } else if (response.comments && Array.isArray(response.comments)) {
          setComments(response.comments);
        } else {
          setComments([]);
        }
      } catch {
        addToast("댓글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchComments();
  }, [postId]);

/** 댓글 작성 */
const handleCommentSubmit = async () => {
  if (newComment.trim() === "") return;

  try {
    const createdComment = await commentService.createComment(postId, newComment);

    if (!createdComment) {
      throw new Error("댓글 생성에 실패했습니다.");
    }

    setComments((prevComments) => [...prevComments, createdComment]);
    setNewComment("");
    addToast("댓글이 성공적으로 등록되었습니다.");
  } catch {
    addToast("댓글 작성 중 오류가 발생했습니다.");
  }
};
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 
    handleCommentSubmit();
  }
};

  /** 댓글 수정 */
  const handleCommentEdit = async (comment) => {
    const updatedContent = prompt("수정할 내용을 입력하세요:", comment.content);
    if (!updatedContent) return;

    try {
      await commentService.updateComment(comment.id, updatedContent);
      setComments((prevComments) =>
        prevComments.map((c) => (c.id === comment.id ? { ...c, content: updatedContent } : c))
      );
    } catch {
      addToast("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  /** 댓글 삭제 */
  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await commentService.deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((c) => c.id !== commentId));
    } catch {
      addToast("댓글 삭제 중 오류가 발생했습니다.");
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
          comments.map((comment) => ( 
            <Comment key={comment.id} comment={comment} onEdit={handleCommentEdit} onDelete={handleCommentDelete} />
          ))
        )}
      </div>
    </div>
  );
}
