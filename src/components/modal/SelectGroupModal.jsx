import { useEffect, useState } from "react";
import GroupList from "@/components/mypage/GroupList.jsx";
import userService from "@/services/user/userService";
import DummyImg from "@/assets/image/profile-basic2.svg";
import CreateMemory from "@/components/modal/CreateMemory";
import {decodeImageUrl} from "../../utils/decodeImageUrl.js";

export default function SelectGroupModal({ onClose }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showCreateMemory, setShowCreateMemory] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await userService.getMyGroups();
        const groupList = response.data.groups.map((item) => ({
          id: item.group.groupId,
          name: item.group.groupName,
          image: item.group.imageUrl ? `${decodeImageUrl(item.group.imageUrl)}` : DummyImg,
        }));

        setGroups(groupList);
      } catch (error) {
        console.error("내가 속한 그룹 목록 불러오기 실패:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
    setShowCreateMemory(true);
  };

  return (
    <>
      {!showCreateMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="w-[30vw] min-h-[30vh] bg-white rounded-lg border border-normalGray p-7 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              ✖
            </button>
            <p className="text-base font-semibold">내가 속한 조각 그룹</p>
            <div className="pt-2 max-h-[25vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {groups.length > 0 ? (
                groups.map((item) => (
                  <div key={item.id} onClick={() => handleGroupSelect(item.id)} className="cursor-pointer">
                    <GroupList img={item.image} groupName={item.name} />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center mt-3">가입한 그룹이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedGroupId && (
        <CreateMemory 
          groupId={selectedGroupId} 
          onClose={() => setSelectedGroupId(null)}
          parentComponent="SelectGroupModal"
        />
      )}

    </>
  );
}
