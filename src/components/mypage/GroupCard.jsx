import GroupList from "@/components/mypage/GroupList.jsx";

import DummyImg1 from "@/assets/image/profile-basic2.svg";
import DummyImg2 from "@/assets/image/profile-basic3.svg";
import DummyImg3 from "@/assets/image/profile-basic4.svg";

const groupData = [
  {id: 1, image: DummyImg1, name: "그룹 1"},
  {id: 2, image: DummyImg2, name: "그룹 2"},
  {id: 3, image: DummyImg3, name: "그룹 3"},
  {id: 4, name: "그룹 4"},
  {id: 5, name: "그룹 5"},
  {id: 5, name: "그룹 6"},
  {id: 5, name: "그룹 7"},
  {id: 5, name: "그룹 8"},
  {id: 5, name: "그룹 9"},
]

export default function GroupCard() {
  return (
      <div className="w-[22vw] min-h-[30vh] bg-white rounded-lg border border-normalGray relative p-7">
        <p className="text-base font-semibold">내가 속한 조각 그룹</p>
        <div className="pt-2 max-h-[25vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {groupData.map((item, index) => (
              <GroupList
                  key={index}
                  img={item.image}
                  groupName={item.name}
              />
          ))}
        </div>
      </div>
  )
}