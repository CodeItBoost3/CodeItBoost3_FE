import Profile from "@/components/mypage/Profile.jsx";
import DummyImg from "@/assets/image/profile-basic1.svg";

export default function GroupList({ img, groupName }) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-2">
      <Profile width="w-[22px]" height="h-[22px]" img={img || DummyImg} />
      <p className="text-black text-xs font-normal truncate w-[150px]">{groupName}</p>
    </div>
  );
}
