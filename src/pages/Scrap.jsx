import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GroupTab from '@/components/group/GroupTab';
import PublicPostCard from '@/components/group/PublicPostCard';
import PrivatePostCard from '@/components/group/PrivatePostCard';
import Pagination from "@/components/common/Pagination";
import SearchBar from "@/components/common/SearchBar";
import SearchButton from "@/components/common/SearchButton";
import Select from '@/components/common/Select';

const GROUP_PARAMS = 'group';

const publicMemories = [
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.01.19', tags: ["태그", "길면", "두줄", "낚시", "인천"], likes: 120, comments: 8 },
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
];

const privateMemories = [
  { author: "달봉이아들", visibility: "비공개", title: '추억 글 제목', date: '24.01.19', likes: 120, comments: 8 },
  { author: "달봉이아들", visibility: "비공개", title: '추억 글 제목', date: '24.02.01', likes: 98, comments: 12 },
];

const options = [
  { label: "최신순", value: "latest" },
  { label: "추억 많은 순", value: "mostPosted" },
  { label: "배지 많은 순", value: "mostBadge" },
  { label: "공감순", value: "mostLiked" }
];


export default function Scrap () {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "mostLiked");
  
  const tabName = searchParams.get(GROUP_PARAMS) || 'Public';
  const totalPages = 10;

  const handleSearch = () => {
    console.log("검색어:", searchTerm);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelect = (selectedValue) => {
    if (selectedValue !== sortBy) {
      setSortBy(selectedValue);
      setSearchParams({ sortBy: selectedValue, group: tabName }, { replace: true });
    }
  };

  return (
    <div className="max-w-[95%] h-full pt-3 pb-7">
      <div className="flex items-center mb-2">
        <span className="text-darkViolet text-2xl font-semibold">스크랩</span>
        <span className="text-black text-2xl font-semibold">한 추억 글 목록</span>
      </div>

      <GroupTab />
      <div
        className="flex mt-4 items-center gap-5"
        style={{ flexBasis: '60%' }}
      >
        <Select options={options} onSelect={handleSelect} value={sortBy} />
        <SearchBar
          name="search"
          placeholder="그룹 이름을 검색해 주세요."
          width="w-full"
          height="h-12"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onEnter={handleSearch} 
        />
        <SearchButton
          name="검색하기"
          onClick={handleSearch} 
          className="h-full whitespace-nowrap font-medium"
        />
      </div>

      <div className="w-full mt-3 py-3">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabName === "Public"
            ? publicMemories.map((memory, index) => 
                <PublicPostCard
                    key={index}
                    id={index + 1}
                    groupId={1} 
                    {...memory}
                />)
            : privateMemories.map((memory, index) => 
                <PrivatePostCard 
                    key={index}
                    id={index + 1}
                    groupId={1} 
                    {...memory}
                />)}
        </div>
      </div>

      <div className="p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
