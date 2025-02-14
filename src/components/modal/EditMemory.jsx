import { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

export default function EditMemory({ onClose }) {
  const [isPublic, setIsPublic] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    nickname: "",
    title: "",
    tags: [],
    location: "",
    memoryDate: "",
    content: "",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
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

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-20">
      <div className="relative w-[90%] md:w-[65%] min-h-[70%] h-auto px-6 md:px-[65px] pt-[40px] pb-[70px] bg-white rounded-[20px] shadow-md border border-darkWhite flex flex-col justify-start items-center overflow-auto">

        <button onClick={onClose} className="absolute top-4 right-4 text-darkGray hover:text-darkGray-hover active:text-darkGray-active">
          <FaTimes size={20} />
        </button>        

        <h2 className="text-center text-xl font-semibold text-darkViolet mb-4">
          <span className="text-black">달봉이네 가족</span>에 새로운 추억 기록하기
        </h2>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          
          <div className="w-full md:w-[365px] flex flex-col">
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-black text-[13px] font-medium">제목</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-[28px] px-[10px] border border-mediumGray rounded-md text-[10px] text-normalGray"
                  placeholder="그룹 이름"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-black text-[13px] font-medium">대표 이미지</label>
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
                <label className="text-black text-[13px] font-medium">본문</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full h-[98px] px-[10px] border border-mediumGray rounded-[10px] text-[10px] text-normalGray"
                  placeholder="본문 내용을 입력해 주세요."
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[365px] flex flex-col">
            <div className="flex flex-col space-y-5">
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-black text-[13px] font-medium">
                    태그 <span className="text-mediumGray">(최대 10개)</span>
                  </span>
                </div>
                <input
                  type="text"
                  className="w-full h-[28px] px-[10px] border border-mediumGray rounded-md text-[10px] text-normalGray"
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
                <label className="text-black text-[13.17px] font-medium">
                  장소
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full h-[27.65px] px-[10.53px] py-[6.58px] border border-normalGray rounded-md text-[10.53px] text-normalGray"
                  placeholder="장소를 입력해 주세요."
                />
              </div>

              <div className="flex flex-col gap-[9.87px]">
                <label className="text-black text-[13.17px] font-medium">
                  추억의 순간
                </label>
                <input
                  type="date"
                  name="memoryDate"
                  value={formData.memoryDate}
                  onChange={handleChange}
                  className="w-[136.26px] h-[28.31px] px-[10.53px] py-[9.87px] border border-normalGray rounded-md text-[10.53px] text-normalGray"
                />
              </div>
              <div className="flex-col items-center space-y-3">
              <label className="text-black text-[13.17px] font-medium">
                  추억 공개 선택
                </label>
                <div className="flex items-center gap-3">
                <span className="text-xs">공개</span>
                <div className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${isPublic ? "bg-darkViolet" : "bg-darkGray-hover"}`} onClick={() => setIsPublic(!isPublic)}>

                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform ${isPublic ? "translate-x-6" : "translate-x-0"} transition-transform`} />
                  </div>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
