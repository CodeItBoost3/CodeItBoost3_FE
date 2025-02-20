import { useEffect, useState } from "react";
import GroupList from "@/components/mypage/GroupList.jsx";
import userService from "@/services/user/userService";
import { useToast } from "@/hooks/useToast";
import DummyImg from "@/assets/image/profile-basic2.svg";

export default function GroupCard() {
  const [groups, setGroups] = useState([]);
  const addToast = useToast();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await userService.getMyGroups();
        const groupList = response.data.groups.map((item) => ({
          id: item.group.groupId,
          name: item.group.groupName,
          image: item.group.imageUrl || DummyImg,
        }));

        setGroups(groupList);
      } catch {
        addToast("내가 속한 그룹 목록 불러오기에 실패했습니다.");
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="w-[22vw] min-h-[30vh] bg-white rounded-lg border border-normalGray relative p-7">
      <p className="text-base font-semibold">내가 속한 조각 그룹</p>
      <div className="pt-2 max-h-[25vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {groups.length > 0 ? (
          groups.map((item, index) => (
            <GroupList key={index} img={item.image} groupName={item.name} />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center mt-3">가입한 그룹이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
