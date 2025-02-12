import {useState} from "react";
import {useNavigate} from "react-router-dom";

import Title from "@/components/notice/Title.jsx";
import SearchBars from "@/components/notice/SearchBars.jsx";
import ListHeader from "@/components/notice/ListHeader.jsx";
import ListItem from "@/components/notice/ListItem.jsx";
import Pagination from "@/components/common/Pagination.jsx";

const noticeData = [
  {
    id: 11,
    title: "서비스 긴급 점검 완료 공지",
    createdAt: "2025-01-30",
    view: 56,
  },
  {
    id: 12,
    title: "출석 체크 이벤트 안내",
    createdAt: "2025-01-29",
    view: 64,
  },
  {
    id: 13,
    title: "커뮤니티 가이드라인 업데이트",
    createdAt: "2025-01-28",
    view: 15,
  },
  {
    id: 14,
    title: "고객센터 운영 시간 변경",
    createdAt: "2025-01-27",
    view: 29,
  },
  {
    id: 15,
    title: "보안 강화 업데이트 안내",
    createdAt: "2025-01-26",
    view: 77,
  },
  {
    id: 16,
    title: "설 연휴 배송 일정 안내",
    createdAt: "2025-01-25",
    view: 85,
  },
  {
    id: 17,
    title: "이용자 만족도 조사 참여 안내",
    createdAt: "2025-01-24",
    view: 34,
  },
  {
    id: 18,
    title: "추천 친구 이벤트 시작",
    createdAt: "2025-01-23",
    view: 21,
  },
  {
    id: 19,
    title: "앱 다운로드 10만 돌파 이벤트",
    createdAt: "2025-01-22",
    view: 100,
  },
  {
    id: 20,
    title: "이용 후기 작성 이벤트 안내",
    createdAt: "2025-01-21",
    view: 45,
  }
];



export default function Notice() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(search);
  }

  const handleListItem = (id) => {
    navigate(`/notice/${id}`);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
      <div className="w-[95%] h-full pt-3 pb-7 overflow-auto">
        <Title
            title={"조각집"}
            subtitle={"공지사항"}
        />
        <SearchBars
            value={search}
            onChange={e => setSearch(e.target.value)}
            handleSearch={handleSearch}
        />
        <table className="w-full mb-7">
          <ListHeader/>
          <tbody>
          {noticeData.slice().reverse().map((item, idx, arr) => (
              <ListItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  createdAt={item.createdAt}
                  view={item.view}
                  onClick={handleListItem}
                  isLast={idx === arr.length - 1}
              />
          ))}
          </tbody>
        </table>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </div>
  );
}
  