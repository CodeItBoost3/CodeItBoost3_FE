import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import userService from "@/services/user/userService";
import PublicPostCard from "@/components/group/PublicPostCard";
import Pagination from "@/components/common/Pagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function MyPostList() {
  const navigate = useNavigate();
  const [publicMemories, setPublicMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const addToast = useToast();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await userService.getMyPosts(currentPage, 10);
        if (response?.status === "success") {
          setPublicMemories(
            response.data?.posts.map((post) => ({
              id: post.postId || null,
              title: post.title || "제목 없음",
              author: post.author?.nickname || "알 수 없음",
              groupId: post.group?.groupId || null,
              location: post.group?.groupName || "그룹 없음",
              moment: post.moment ? new Date(post.moment).toLocaleDateString("ko-KR") : "날짜 없음",
              tag: Array.isArray(post.tag) ? post.tag : [],
              imageUrl: post?.imageUrl ? `https://${post.imageUrl}` : null,
              likeCount: post.likeCount || 0,
              commentCount: post.commentCount || 0,
            }))
          );
          setTotalPages(response.data.totalPages || 1);
        } else {
          addToast("작성한 글을 불러오는 데 실패했습니다.");
        }
      } catch {
        addToast("내가 작성한 글을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [currentPage]);

  if (isLoading) return <LoadingSpinner size={200} />;

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-semibold mb-4">내가 작성한 글</h2>
      
      {publicMemories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {publicMemories.map((memory, index) => (
            <PublicPostCard key={index} {...memory} onClick={() => navigate('/')} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">작성한 글이 없습니다.</p>
      )}

      <div className="mt-6">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
