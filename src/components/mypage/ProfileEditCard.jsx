import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import EditIcon from "@/assets/icon/mypage/edit.svg";
import DefaultProfileImage from "@/assets/image/profile-basic1.svg";

import userService from "@/services/user/userService";

import Profile from "@/components/mypage/Profile.jsx";
import ProfileEditList from "@/components/mypage/ProfileEditList.jsx";

import AlertModal from "@/components/modal/Alert.jsx";

export default function ProfileEditCard({onClickEdit}) {
  const [isLogOut, setIsLogOut] = useState(false);
  const [nickname, setNickname] = useState("");
  const [clientId, setClientId] = useState("");
  const [profileImage, setProfileImage] = useState(DefaultProfileImage);

  const navigate = useNavigate();
  const fetchUserInfo = async () => {
    try {
      const userData = await userService.getUserInfo();
      setNickname(userData.data.nickname);
      setClientId(userData.data.clientId);

      if (!userData.data.profileImageUrl || userData.data.profileImageUrl.includes("null")) {
        setProfileImage(DefaultProfileImage);
      } else {
        const absoluteImageUrl = `https://${userData.data.profileImageUrl}`;
        setProfileImage(absoluteImageUrl);
      }
    } catch {
      console.log("사용자 정보를 불러올 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  useEffect(() => {
    fetchUserInfo();
  }, [onClickEdit]);

  const handleProfileUpdated = () => {
    fetchUserInfo();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpires");
    navigate("/");
  }

  const profileData = [
    {id: 1, title: "닉네임", data: nickname},
    {id: 2, title: "아이디", data: clientId},
    {id: 3, title: "비밀번호", data: "*인증필요"},
  ];


  return (
      <div className="w-[29vw] min-h-[30vh] h-auto bg-white rounded-lg border border-normalGray relative p-7">
        <button className="absolute right-4 top-3.5 w-5 h-5 bg-white rounded-full shadow-card p-1"
                onClick={() => onClickEdit(handleProfileUpdated)}>
          <img src={EditIcon}/>
        </button>
        <div className="flex items-center gap-2.5 border-b border-gray-200 pb-2.5">
          <Profile img={profileImage}/>
          <p className="text-xs text-gray-800 font-normal">{nickname}</p>
        </div>
        <div className="pt-0.5">
          {profileData.map((item, idx) => (
              <ProfileEditList
                  key={idx}
                  title={item.title}
                  data={item.data}/>
          ))}
        </div>
        <div className="flex w-full align-middle justify-end pt-5">
          <p className="cursor-pointer text-darkGray-active text-[9px] font-normal" onClick={() => setIsLogOut(true)}>로그아웃</p>
          <span
              className="mx-2 relative after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-px after:h-2 after:bg-darkGray-active after:-translate-y-1/2"/>
          <p className="cursor-pointer text-darkGray-active text-[9px] font-normal">회원탈퇴</p>
        </div>
            <AlertModal
                isOpen={isLogOut}
                title={"정말로 로그아웃 하시겠습니까?"}
                message={"로그아웃 후 이용시 로그인이 필요합니다."}
                confirmText={"로그아웃"}
                cancelText={"취소"}
                onConfirm={handleLogout}
                onCancel={() => setIsLogOut(false)}
                parentComponent="Main"
            />
      </div>
  );
}
