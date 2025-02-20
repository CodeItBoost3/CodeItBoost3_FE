import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import userService from "@/services/user/userService";
import Reply from "@/components/mypage/Reply";
import Pagination from "@/components/common/Pagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function MyCommentList() {
  const [replyData, setReplyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const addToast = useToast();

  useEffect(() => {
    const fetchMyComments = async () => {
      try {
        const data = await userService.getMyComments(currentPage, 10);
        if(data.status === "success") {
          setTotalPages(data?.data?.totalPages);
          setReplyData(data?.data?.comments || []);
        }
      } catch {
        addToast("내가 작성한 댓글을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyComments();
  }, [currentPage]);

  if (isLoading) return <LoadingSpinner size={200} />;
  
  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-semibold mb-4">내가 작성한 댓글</h2>
      
      {replyData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {replyData.map((reply, index) => (
            <Reply key={index} title={reply.post.title} content={reply.content} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">작성한 댓글이 없습니다.</p>
      )}

      <div className="mt-6">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
