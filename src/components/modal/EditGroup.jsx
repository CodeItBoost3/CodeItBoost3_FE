import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useToast } from "@/hooks/useToast";
import groupService from "@/services/group/groupService";


export default function EditGroupModal({ onClose, onUpdate }) {
  const { groupId } = useParams();
  const addToast = useToast();
  const [initialGroupName, setInitialGroupName] = useState("");
  const [initialGroupDescription, setInitialGroupDescription] = useState("");
  const [initialIsPublic, setInitialIsPublic] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await groupService.getGroupDetail(groupId);
        if (response) {
          setGroupName(response.groupName);
          setGroupDescription(response.groupDescription);
          setIsPublic(response.isPublic);
          setImageUrl(response.imageUrl ? `https://${response.imageUrl}` : null);
          setPreviewImage(response.imageUrl || null);
  
          setInitialGroupName(response.groupName);
          setInitialGroupDescription(response.groupDescription);
          setInitialIsPublic(response.isPublic);
        }
      } catch {
        addToast("그룹 정보를 불러오는 데 실패했습니다.");
      }
    };
  
    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);
  

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
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
    setPreviewImage(null);
    setImageFile(null);
    setImageUrl(null); 
  };
  

  const handleSubmit = async () => {
    const formData = new FormData();
  
    if (groupName !== initialGroupName) formData.append("name", groupName);
    if (groupDescription !== initialGroupDescription) formData.append("introduction", groupDescription);
    if (isPublic !== initialIsPublic) formData.append("isPublic", isPublic);
  
    if (imageFile) {
      formData.append("groupImage", imageFile);
    }
  
    try {
      const response = await groupService.updateGroup(groupId, formData);
      
      if (response.status === "success") {
        addToast("그룹 정보가 수정되었습니다!");
        onUpdate(response.data);
        onClose();
      } else {
        addToast("그룹 수정에 실패했습니다.");
      }
    } catch (error) {
      addToast("그룹 수정 요청 중 오류가 발생했습니다.");
      console.error("그룹 수정 오류:", error);
    }
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
          {(imageUrl || previewImage) && (
        <div className="relative w-full mt-2 rounded-lg overflow-hidden border border-gray-300">
          <img 
            src={previewImage ? previewImage : imageUrl} 
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
