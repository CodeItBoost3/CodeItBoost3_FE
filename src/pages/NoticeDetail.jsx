import {useState} from "react";
import {useParams} from "react-router-dom";

import Title from "@/components/notice/Title.jsx";
import SearchBars from "@/components/notice/SearchBars.jsx";


export default function NoticeDetail() {
  const [search, setSearch] = useState("");
  const id = useParams().noticeId;

  const handleSearch = () => {
    console.log(search);
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
        <div>{id}</div>
      </div>
  )
}