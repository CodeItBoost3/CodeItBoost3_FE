import { useState, useEffect } from "react";
import commentService from "@/services/comment/commentService";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useToast } from "@/hooks/useToast";

import userService from "@/services/user/userService";
import userProfile from "@/assets/icon/group/default-profile.svg";
import EditIcon from "@/assets/icon/group/comment-edit.svg";
import DeleteIcon from "@/assets/icon/group/comment-delete.svg";
import defaultComment from "@/assets/icon/group/no-comment.svg";


function Comment({ postId, comment, onEdit, onDelete, onLike, onReply, myId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const handleSaveEdit = () => {
    if (editedContent.trim() === "" || editedContent === comment.content) {
      setIsEditing(false);
      return;
    }

    onEdit(comment.commentId, editedContent);
    setIsEditing(false);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim() === "") return;
  
    onReply(postId, comment.commentId, replyContent);
    setReplyContent("");
    setIsReplying(false);
  };
  
  
  

  return (
    <div className={`flex flex-col py-3 relative ${comment.parentId ? "ml-6 pl-4 before:absolute before:-left-4 before:top-1 before:w-4 before:h-4 before:border-l-2 before:border-b-2 before:border-gray-300" : ""}`}>

      <div className="flex items-start space-x-3">
        <img src={comment.profile || userProfile} alt="프로필" className="w-8 h-8 rounded-full" />
        <div className="flex-1">
          <span className="text-sm font-semibold">{comment.nickname}</span>
          {isEditing ? (
            <input
              type="text"
              className="w-full text-gray-800 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
              autoFocus
            />
          ) : (
            <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
          )}

          <div className="flex items-center gap-3 mt-2 text-sm text-darkGray">
          {!comment.parentId && (
            <>            
            <button onClick={() => onLike(comment.commentId)} className="hover:text-darkViolet transition">
              {comment.isLiked ? "💜" : "🤍"} {comment.likeCount || 0}
            </button>
            <button onClick={() => setIsReplying(!isReplying)} className="hover:text-darkViolet transition">
              💬 답글
            </button>
            </>)}
          </div>
        </div>

        {comment.userId === myId && (
          <div className="flex gap-2">
            <img src={EditIcon} alt="수정" className="w-4 h-4 cursor-pointer" onClick={() => setIsEditing(true)} />
            <img src={DeleteIcon} alt="삭제" className="w-4 h-4 cursor-pointer" onClick={() => onDelete(comment.commentId)} />
          </div>
        )}
      </div>

      {isReplying && (
        <div className="mt-3 ml-12 flex items-center space-x-2">
          <input
            type="text"
            placeholder="답글을 입력하세요..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleReplySubmit(comment.commentId, replyContent)}
            className="w-full text-gray-800 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
          />
          <button onClick={() => handleReplySubmit(comment.commentId, replyContent)} className="text-darkViolet text-sm font-semibold">
          <PaperAirplaneIcon className="w-6 h-6 text-darkerGray" />
        </button>
        </div>
      )}

    </div>
  );
}



export default function CommentSection({ postId }) {
  const addToast = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userService.getUserInfo();
        setMyId(data.data.id);
      } catch {
        addToast("사용자 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentService.getCommentsByPost(postId);

        if (response.status === "success" && response.data?.comments) {
          setComments(response.data.comments);
        } else {
          setComments([]);
        }
      } catch {
        addToast("댓글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentEdit = async (commentId, updatedContent) => {
    try {
      await commentService.updateComment(commentId, updatedContent);
      setComments((prevComments) =>
        prevComments.map((c) => (c.commentId === commentId ? { ...c, content: updatedContent } : c))
      );
      addToast("댓글이 수정되었습니다.");
    } catch {
      addToast("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    try {
      const createdComment = await commentService.createComment(postId, newComment);
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment("");
      addToast("댓글이 성공적으로 등록되었습니다.");
    } catch {
      addToast("댓글 작성 중 오류가 발생했습니다.");
    }
  };


  const handleReplySubmit = async (postId, parentId, replyContent) => {
    if (replyContent.trim() === "") return;
  
    try {
  
      const createdReply = await commentService.createComment(postId, replyContent, parentId);
  
      if (!createdReply || !createdReply.commentId) {
        throw new Error("대댓글 생성 응답이 유효하지 않습니다.");
      }
  
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === parentId
            ? { ...comment, replies: [...comment.replies, createdReply] } 
            : comment
        )
      );
  
      addToast("답글이 성공적으로 등록되었습니다.");
    } catch {
      addToast("답글 작성 중 오류가 발생했습니다.");
    }
  };
  

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await commentService.deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((c) => c.commentId !== commentId));
    } catch {
      addToast("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const response = await commentService.likeComment(commentId);
  
      const { liked, likeCount } = response.data;
  
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.commentId === commentId ? { ...c, likeCount, isLiked: liked } : c
        )
      );
  
      if (liked) {
        addToast("좋아요가 추가되었습니다! 💜");
      } else {
        addToast("좋아요가 취소되었습니다. 💔");
      }
    } catch {
      addToast("좋아요 요청 중 오류가 발생했습니다.");
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
          onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
          className="bg-transparent flex-1 outline-none text-darkerGray"
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
          <div key={comment.commentId}>
            <Comment
              postId={postId}
              comment={comment}
              onEdit={handleCommentEdit}
              onDelete={handleCommentDelete}
              onLike={handleCommentLike}
              onReply={handleReplySubmit}
              myId={myId}
            />
              {(comment.replies?.length || 0) > 0 && (
                <div className="ml-6 pl-4">
                  {comment.replies.map((reply) => (
                    <Comment
                      key={reply.commentId}
                      postId={postId}
                      comment={reply}
                      onEdit={handleCommentEdit}
                      onDelete={handleCommentDelete}
                      onLike={handleCommentLike}
                      onReply={handleReplySubmit}
                      myId={myId}
                    />
                  ))}
                </div>
              )}
          </div>
        ))
      )}
    </div>

    </div>
  );
}