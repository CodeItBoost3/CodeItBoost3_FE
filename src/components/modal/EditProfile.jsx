import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

import { useToast } from "@/hooks/useToast";

import userService from "@/services/user/userService";

import Profile from "@/components/mypage/Profile.jsx";

import DefaultProfileImage from "@/assets/image/profile-basic1.svg";
import UploadIcon from "@/assets/icon/mypage/upload.svg";
import DeleteIcon from "@/assets/icon/mypage/delete.svg";

export default function EditProfile({ onClose, onVerfiyChange, onProfileUpdated  }) {
  const addToast = useToast();
  const [nickname, setNickname] = useState("");
  const [clientId, setClientId] = useState("");
  const [profile, setProfile] = useState(DefaultProfileImage);
  const [selectedFile, setSelectedFile] = useState(null); 

  const fetchUserInfo = async () => {
    try {
      const userData = await userService.getUserInfo();
      setNickname(userData.data.nickname);
      setClientId(userData.data.clientId);

      if (!userData.data.profileImageUrl || userData.data.profileImageUrl.includes("null")) {
        setProfile(DefaultProfileImage);
      } else {
        const absoluteImageUrl = `https://${userData.data.profileImageUrl}`;
        setProfile(absoluteImageUrl);
      }
    } catch {
      console.log("사용자 정보를 불러올 수 없습니다.");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  
  
  const handleRemoveImage = async () => {
    try {
      await userService.deleteProfileImage();
      addToast("프로필 이미지가 삭제되었습니다.");
  
      await fetchUserInfo();
    } catch {
      addToast("프로필 이미지 삭제에 실패했습니다.");
    }
  };
  
  const handleUpdateProfile = async () => {
    try {
      if (selectedFile) {
        await userService.updateProfileImage(selectedFile);
        addToast("프로필 이미지가 변경되었습니다.");
      }
  
      await userService.updateUserInfo(nickname);
      await fetchUserInfo();
      
      if (onProfileUpdated) onProfileUpdated();
  
      addToast("프로필 정보가 수정되었습니다.");
      onClose();
    } catch {
      addToast("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[470px] bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">내 정보 수정</h2>
          <button onClick={onClose}>
            <IoClose size={24} className="text-black" />
          </button>
        </div>

        <div className="flex items-end gap-2.5 mt-5">
          <Profile img={profile} width={"w-[65px]"} height={"h-[65px]"} />
          <div className="flex gap-2.5 h-7 pt-1 pb-1 pl-3 pr-3 rounded-full border border-normalGray bg-white">
            <label className="block cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <img src={UploadIcon} alt="Upload Icon" className="cursor-pointer w-[17px] h-[17px]" />
            </label>
            <img src={DeleteIcon} alt="Delete Icon" className="cursor-pointer w-[17px] h-[17px]" onClick={handleRemoveImage} />
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                    focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                    outline-none transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">아이디</label>
          <input
            type="text"
            value={clientId}
            disabled
            className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                    bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">비밀번호</label>
          <label className="block mt-2 cursor-pointer">
            <div
              className="w-full p-3 bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active text-center text-sm font-medium text-black rounded-md"
              onClick={onVerfiyChange}
            >
              인증하고 변경하기
            </div>
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdateProfile}
            className="px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
