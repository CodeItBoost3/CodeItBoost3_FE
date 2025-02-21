import { useState, useEffect } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

import postService from "@/services/post/postService";
import { useToast } from "@/hooks/useToast";

export default function EditMemory({ post, onClose, onUpdate }) {
  const addToast = useToast();
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageURL, setPreviewImageURL] = useState(null); 
  const [formData, setFormData] = useState({
    nickname: "",
    title: "",
    tags: [],
    location: "",
    memoryDate: "",
    content: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        tags: post.tag || [],
        location: post.location || "",
        memoryDate: post.moment?.split("T")[0] || "",
        content: post.content || "",
      });
  
      if (post.imageUrl) {
        setPreviewImageURL(`https://${post.imageUrl}`);
      }
    }
  }, [post]);
  
  
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageURL(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.target.value.trim();
      if (newTag && !formData.tags.includes(newTag) && formData.tags.length < 10) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      event.target.value = "";
    }
  };

  const handleTagClick = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleEditPost = async () => {
    if (!post || !post.postId) {
      addToast("수정할 게시글 정보가 없습니다.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("tag", JSON.stringify(formData.tags));
    formDataToSend.append("location", formData.location);
    formDataToSend.append("moment", formData.memoryDate); 
  
    if (previewImage) {
      formDataToSend.append("image", previewImage);
    }
  
    try {
      const updatedPost = await postService.updatePost(post.postId, formDataToSend);
      onUpdate(updatedPost.data); 
      onClose();
      addToast("게시글이 수정되었습니다!");
    } catch {
      addToast("게시글 수정에 실패했습니다.");
    }
  };

  
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-20">
      <div className="relative w-[90%] md:w-[65%] min-h-[50%] h-auto px-6 md:px-[65px] pt-[40px] pb-[70px] bg-white rounded-[20px] shadow-md border border-darkWhite flex flex-col justify-start items-center overflow-auto">

        <button onClick={onClose} className="absolute top-4 right-4 text-darkGray hover:text-darkGray-hover active:text-darkGray-active">
          <FaTimes size={20} />
        </button>        

        <h2 className="text-center text-xl font-semibold text-darkViolet mb-4">
          <span className="text-black">추억 글 수정하기</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          
          <div className="w-full md:w-[50%] flex flex-col">
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-black text-[16px] font-medium">제목</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="focus:outline-normalViolet h-10 px-[10px] border border-mediumGray rounded-md text-[14px] text-black placeholder:text-normalGray"
                  placeholder="추억 글 이름"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-black text-[16px] font-medium">대표 이미지</label>
                <div className="mt-2">
                  {previewImageURL && (
                    <div className="relative w-full mt-1 rounded-lg overflow-hidden border border-gray-300">
                      <img 
                        src={previewImageURL} 
                        alt="Preview" 
                        className="w-full object-cover" 
                        style={{ aspectRatio: "2 / 0.7" }}
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  )}
                  <label className="block mt-2 cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <div className="w-full p-3 bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active text-center text-sm font-medium text-black rounded-md">
                      파일 업로드
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black text-[16px] font-medium">본문</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="focus:outline-normalViolet w-full h-[98px] px-[10px] border border-mediumGray rounded-[10px] text-[14px] text-black placeholder:text-normalGray p-2"
                  placeholder="본문 내용을 입력해 주세요."
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[50%] flex flex-col">
            <div className="flex flex-col space-y-5">
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black text-[16px] font-medium">
                    태그 <span className="text-mediumGray">(최대 10개)</span>
                  </span>
                  <span className="text-darkerGray text-xs">*태그 클릭 시 해당 태그가 삭제됩니다.</span>
                </div>
                <input
                  type="text"
                  className="focus:outline-normalViolet w-full h-10 px-[10px] border border-mediumGray rounded-md text-[14px] text-black placeholder:text-normalGray"
                  placeholder="Enter를 누르면 태그가 등록됩니다."
                  onKeyDown={handleTagKeyDown}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="cursor-pointer bg-lightViolet text-black px-2 py-1 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
              </div>

              <div className="flex flex-col gap-[9.87px]">
                <label className="text-black text-[16px] font-medium">
                  장소
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="focus:outline-normalViolet w-full h-10 px-[10.53px] py-[6.58px] border border-mediumGray rounded-md text-[14px] text-black placeholder:text-normalGray"
                  placeholder="장소를 입력해 주세요."
                />
              </div>

              <div className="flex flex-col gap-[9.87px]">
                <label className="text-black text-[16px] font-medium">
                  추억의 순간
                </label>
                <input
                  type="date"
                  name="memoryDate"
                  value={formData.memoryDate}
                  onChange={handleChange}
                  className="focus:outline-normalViolet w-[136.26px] h-10 px-[10.53px] py-[9.87px] border border-mediumGray rounded-md text-[14px] text-black placeholder:text-normalGray"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full mt-6">
          <button
            onClick={handleEditPost}
            className="w-[150px] h-[40px] bg-normalViolet text-white font-medium text-sm rounded-lg 
                       hover:bg-normalViolet-hover active:bg-normalViolet-active transition"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
