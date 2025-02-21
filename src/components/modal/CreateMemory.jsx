import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";

import { FaTrash, FaTimes, FaLightbulb } from "react-icons/fa";
import postService from "@/services/post/postService";
import { useToast } from "@/hooks/useToast";
import axiosInstance from "@/services/axiosInstance";

export default function CreateMemory({ onClose, groupId: propGroupId, parentComponent }) {
  const { groupId: paramGroupId } = useParams();
  const groupId = parentComponent === "SelectGroupModal" ? propGroupId : paramGroupId || null;

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const addToast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    location: "",
    memoryDate: "",
  });

  // 🔹 글감 추천 관련 상태
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef(null);

  /** 🔹 글감 추천 가져오기 */
  const fetchPrompt = async () => {
    setIsLoadingPrompt(true);
    setDisplayedText("");

    try {
      const response = await axiosInstance.get("/prompt");
      const newPrompt = response.data?.data?.prompt || "글감을 가져올 수 없습니다. 다시 시도해주세요.";

      setPrompt(newPrompt);
      setDisplayedText("");
      setIsLoadingPrompt(false);
    } catch {
      addToast("글감을 가져오는 중 오류가 발생했습니다.");
      setIsLoadingPrompt(false);
    }
  };

  /** 🔹 타이핑 애니메이션 */
  useEffect(() => {
    if (!prompt || prompt.length === 0) return;

    let i = 0;
    setDisplayedText("");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (i >= prompt.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }

      setDisplayedText(prompt.slice(0, i + 1));
      i++;
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [prompt]);

  /** 🔹 추천 글감 적용 */
  const applyPromptToTitle = () => {
    setFormData((prev) => ({
      ...prev,
      title: displayedText,
    }));
  };

  /** 🔹 기존 함수 (대표 이미지 업로드, 삭제, 태그 추가 등 그대로 유지) */
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
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

  /** 게시글 작성 요청 */
  const handleCreatePost = async () => {
    if (!groupId) {
      addToast("올바른 그룹을 선택해주세요.");
      return;
    }
    if (!formData.title.trim()) {
      addToast("제목을 입력해주세요.");
      return;
    }
    if (!formData.content.trim()) {
      addToast("본문 내용을 입력해주세요.");
      return;
    }
    if (!formData.memoryDate) {
      addToast("추억의 순간 날짜를 선택해주세요.");
      return;
    }
  
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        location: formData.location,
        moment: formData.memoryDate,
        tag: formData.tags,
        imageFile: imageFile,
      };
      await postService.createPost(groupId, postData);
  
      addToast("게시글이 성공적으로 등록되었습니다.");
      onClose();
    } catch(error) {
      addToast(error.message || "게시글 작성중 오류가 발생했습니다.");
    }
  };
  
  
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-20">
      <div className="relative w-[90%] md:w-[65%] min-h-[50%] h-auto px-6 md:px-[65px] pt-[40px] pb-[70px] bg-white rounded-[20px] shadow-md border border-darkWhite flex flex-col justify-start items-center overflow-hidden">

        <button onClick={onClose} className="absolute top-4 right-4 text-darkGray hover:text-darkGray-hover active:text-darkGray-active">
          <FaTimes size={20} />
        </button>        

        <h2 className="text-center text-xl font-semibold text-black mb-4">
          새로운 추억 기록하기
        </h2>

        <button
          onClick={fetchPrompt}
          className="absolute top-4 left-4 flex items-center p-2 rounded-[5px] bg-lightGray hover:bg-lightGray-hover gap-2 text-gray-700 hover:text-gray-900 transition group"
        >
          <FaLightbulb size={18} />
          <span className="text-sm">글감 추천</span>

          <div className="absolute right-[-200%] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            글감 추천 버튼을 이용해 보세요!
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 border-8 border-transparent border-r-gray-800"></div>
          </div>
        </button>


        {isLoadingPrompt ? (
          <p className="text-sm text-gray-600 mb-2">⏳ 글감 추천 중...</p>
        ) : (
          <>
          {displayedText && (
            <div className="bg-lightGray py-3 pl-4 pr-5 rounded-md text-black text-sm my-2 relative">
              <p>{displayedText}</p>
          
              <button
                onClick={() => {
                  setPrompt("");
                  setDisplayedText("");
                }}
                className="absolute top-1 right-1 text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={14} />
              </button>
          
              <button
                onClick={applyPromptToTitle}
                className="mt-1 text-xs text-blue-600 underline"
              >
                제목에 적용하기
              </button>
            </div>
          )}
          </>
        )}

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
                  className="focus:outline-normalViolet w-full h-10 px-[10px] border border-mediumGray rounded-md text-[14px] text-black placeholder:text-normalGray"
                  placeholder="추억 글 제목"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-black text-[16px] font-medium">대표 이미지</label>
                <div className="mt-2">
                  {previewImage && (
                    <div className="relative w-full mt-1 rounded-lg overflow-hidden border border-gray-300">
                      <img 
                        src={previewImage} 
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
              
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
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
                <label className="text-black text-[16px] font-medium">장소</label>
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
                <label className="text-black text-[16px] font-medium">추억의 순간</label>
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
            onClick={handleCreatePost}
            className="w-[150px] h-[40px] bg-normalViolet text-white font-medium text-sm rounded-lg 
                       hover:bg-normalViolet-hover active:bg-normalViolet-active transition"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

CreateMemory.propTypes = {
  groupId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  parentComponent: PropTypes.string,
};
