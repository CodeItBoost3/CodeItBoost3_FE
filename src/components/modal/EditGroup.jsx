import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function EditGroupModal({ onClose, groupData, onUpdate }) {
  const [groupName, setGroupName] = useState(groupData.name);
  const [groupDescription, setGroupDescription] = useState(groupData.description);
  const [isPublic, setIsPublic] = useState(groupData.isPublic);
  const [previewImage, setPreviewImage] = useState(groupData.image || null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
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

  const handleSubmit = () => {
    const updatedGroup = {
      name: groupName,
      description: groupDescription,
      isPublic,
      image: previewImage,
    };
    onUpdate(updatedGroup); // 업데이트 함수 호출
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[470px] bg-white rounded-2xl p-8 shadow-lg">
        
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">그룹 수정</h2>
          <button onClick={onClose}>
            <IoClose size={24} className="text-black" />
          </button>
        </div>

        {/* 그룹명 */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-black">그룹명</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet 
                        outline-none transition-all duration-200 ease-in-out"
          />
        </div>

        {/* 대표 이미지 */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-black">대표 이미지</label>
          {previewImage && (
            <div className="relative w-full mt-2 rounded-lg overflow-hidden border border-gray-300">
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

        {/* 그룹 소개 */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-black">그룹 소개</label>
          <textarea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="w-full mt-1 p-2.5 border border-black rounded-md text-sm placeholder-gray-400 h-20
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet 
                        outline-none transition-all duration-200 ease-in-out"
          />
        </div>

        {/* 공개 여부 토글 */}
        <div className="mt-5 flex items-center justify-between">
          <label className="text-sm font-medium text-black">그룹 공개 선택</label>
          <div
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              isPublic ? "bg-darkViolet" : "bg-darkGray-hover"
            }`}
            onClick={() => setIsPublic(!isPublic)}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform ${
                isPublic ? "translate-x-6" : "translate-x-0"
              } transition-transform`}
            />
          </div>
        </div>

        {/* 수정 버튼 */}
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleSubmit}
            className="px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md flex items-center gap-2"
          >
            <FaEdit size={14} />
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
