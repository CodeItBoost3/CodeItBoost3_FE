import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useToast } from "@/hooks/useToast";

import groupService from "@/services/group/groupService";
import userService from "@/services/user/userService";

export default function CreateGroup({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const addToast = useToast();

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

  const handleCreateGroup = async () => {
    if (!groupName.trim() || groupName.length < 2 || groupName.length > 36) {
      addToast("그룹명은 2~36자로 입력해야 합니다.");
      return;
    }
    if (!isPublic && (!password || password.length < 6 || password.length > 16)) {
      addToast("비밀번호는 6~16자로 입력해야 합니다.");
      return;
    }
  
    try {
      const userInfo = await userService.getUserInfo();
      const userId = userInfo.data?.id;
  
      if (!userId) {
        throw new Error("사용자 정보를 가져올 수 없습니다.");
      }
  
      const formData = new FormData();
      formData.append("name", groupName);
      formData.append("introduction", introduction);
      formData.append("isPublic", isPublic.toString());
  
      if (!isPublic) {
        formData.append("password", password);
      }
  
      if (imageFile) {
        formData.append("groupImage", imageFile);
      }
  
      await groupService.createGroup(formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
  
      addToast("그룹이 성공적으로 생성되었습니다!");
      onClose();
    } catch (error) {
      console.error("그룹 생성 실패:", error);
      addToast(error.response?.data?.message || "그룹 생성 중 오류 발생");
    }
  };
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[470px] bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">그룹 만들기</h2>
          <button onClick={onClose}>
            <IoClose size={24} className="text-black" />
          </button>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">그룹명</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="그룹 이름"
            className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet 
                        outline-none transition-all duration-200 ease-in-out"
          />
        </div>
        {!isPublic && (
          <div className="mt-5">
            <label className="block text-sm font-medium text-black">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 (6~16자)"
              className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400"
            />
          </div>
        )}

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">대표 이미지</label>
          {previewImage && (
            <div className="relative w-full mt-2 rounded-lg overflow-hidden border border-gray-300">
              <img src={previewImage} alt="Preview" className="w-full object-cover" style={{ aspectRatio: "2 / 0.7" }} />
              <button onClick={handleRemoveImage}  className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white">
                <FaTrash size={14} />
              </button>
            </div>
          )}
          <label className="block mt-2 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <div className="w-full p-3 bg-lightViolet text-center text-sm font-medium text-black rounded-md">
              파일 업로드
            </div>
          </label>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">그룹 소개</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="그룹을 소개해 주세요."
            className="w-full mt-1 p-2.5 border border-black rounded-md text-sm placeholder-gray-400 h-20
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet 
                        outline-none transition-all duration-200 ease-in-out"
          />
        </div>

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

        <div className="mt-6 flex justify-end">
          <button onClick={handleCreateGroup} className="px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
            만들기
          </button>
        </div>
      </div>
    </div>
  );
}
