// import PublicGroupCard from "@/components/common/PublicGroupCard"; {/* 공개 그룹 카드 컴포넌트 */}
import ProfileEditCard from "@/components/mypage/ProfileEditCard.jsx";
import MemoryAction from "@/components/Main/MemoryAction.jsx";
import GroupCard from "@/components/mypage/GroupCard.jsx";

export default function Mypage() {
  return (
      <div className="w-full h-full pt-3 pb-7 overflow-auto">
        <div className="flex items-center mb-6">
        <span className="text-darkViolet text-2xl font-semibold">
           홍길동
        </span>
          <span className="text-black text-2xl font-semibold">
          님, 안녕하세요!
          </span>
        </div>
        <div className="flex gap-10 max-w-[95%]">
          <ProfileEditCard />
          <MemoryAction/>
          <GroupCard/>
        </div>
      </div>
  );
}
  