import {useState} from "react";
import {IoClose} from "react-icons/io5";

import Profile from "@/components/mypage/Profile.jsx";

import Image from "@/assets/image/profile-basic1.svg";
import UploadIcon from "@/assets/icon/mypage/upload.svg";
import DeleteIcon from "@/assets/icon/mypage/delete.svg";

export default function EditProfile({onClose,onVerfiyChange, nickname, id}) {
  const [profile, setProfile] = useState(Image);

  const handleImageUpload = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfile(Image);
  }
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-[470px] bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">내 정보 수정</h2>
            <button onClick={onClose}>
              <IoClose size={24} className="text-black"/>
            </button>
          </div>

          <div className="flex items-end gap-2.5 mt-5">
            <Profile img={profile} width={"w-[65px]"} height={"h-[65px]"}/>
            <div className="flex gap-2.5 h-7 pt-1 pb-1 pl-3 pr-3 rounded-full border border-normalGray bg-white">
              <label className="block cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload}/>
                <img src={UploadIcon} alt="Upload Icon" className="w-[17px] h-[17px]"/>
              </label>
              <img src={DeleteIcon} alt="Delete Icon" className="w-[17px] h-[17px]" onClick={handleRemoveImage}/>
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-black">닉네임</label>
            <input
                type="text"
                placeholder={nickname}
                className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                        outline-none transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-black">아이디</label>
            <input
                type="text"
                placeholder={id}
                className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                        outline-none transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-black">비밀번호</label>
            <label className="block mt-2 cursor-pointer">
              <div className="w-full p-3 bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active text-center text-sm font-medium text-black rounded-md" onClick={onVerfiyChange}>
                인증하고 변경하기
              </div>
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
                className="px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
              수정하기
            </button>
          </div>
        </div>
      </div>
  )
}