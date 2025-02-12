import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useParams } from "react-router-dom";

import GroupTab from '@/components/group/GroupTab';
import SearchBar from "@/components/common/SearchBar";
import SearchButton from "@/components/common/SearchButton";
import Select from '@/components/common/Select';
import PublicPostCard from '@/components/group/PublicPostCard';
import PrivatePostCard from '@/components/group/PrivatePostCard';
import Pagination from "@/components/common/Pagination";

import AddIcon from "@/assets/icon/group/add-memory.svg";
import LogoImage from "@/assets/image/logo-image.svg";
import MoreIcon from "@/assets/icon/group/more.svg";

export default function GroupDetail() {
  // const { groupId } = useParams();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const GROUP_PARAMS = 'group';
  const tabName = searchParams.get(GROUP_PARAMS) || 'Public';

  const options = ["최신순", "공감순", "조회순"];

  const handleSearch = () => {
    console.log("검색어:", searchTerm);
  };

  const handleSelect = (selected) => {
    console.log("선택된 옵션:", selected);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const publicMemories = [
    { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.01.19', tags: ["태그", "길면", "두줄", "낚시", "인천"], likes: 120, comments: 8 },
    { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
  ];

  const privateMemories = [
    { author: "달봉이아들", visibility: "비공개", title: '추억 글 제목', date: '24.01.19', likes: 120, comments: 8 },
    { author: "달봉이아들", visibility: "비공개", title: '추억 글 제목', date: '24.02.01', likes: 98, comments: 12 },
  ];

  return ( 
    <div className="w-full max-w-[1200px] mx-auto py-3">
      <div className="flex flex-col md:flex-row p-6 relative">
        <img className="w-[180px] h-[180px] rounded-lg object-cover" src="https://placehold.co/180x180" alt="그룹 이미지" />

        <div className="flex-1 ml-6 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-black">D+265</span>
            <span className="text-sm text-darkGray-active">| 공개</span>
          </div>
          <div className='space-y-2'>
            <h1 className="text-2xl font-bold text-black">달봉이네 가족</h1>
            <p className="text-sm text-darkerGray">서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.</p>
          </div>

          <div className='space-y-2'>
            <h1 className='mt-5 font-semibold text-base text-darkerGray ml-1'>획득배지</h1>
            <div className="mt-1 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <span className="bg-darkWhite text-sm px-3 py-1 rounded-full">👾 7일 연속 추억 등록</span>
              <span className="bg-darkWhite text-sm px-3 py-1 rounded-full">🌼 그룹 공감 1만 개 이상 받기</span>
              <span className="bg-darkWhite text-sm px-3 py-1 rounded-full">💖 추억 공감 1만 개 이상 받기</span>
            </div>

            <div className="flex space-x-4 mt-3 md:mt-0">
              <button className="px-5 py-2 text-white bg-black hover:bg-black-hover active:bg-black-active rounded-lg">참여하기</button>
              <button className="flex items-center px-5 py-2 bg-white hover:bg-background active:bg-darkWhite border rounded-lg">
                <img src={LogoImage} alt="공감 아이콘" className="w-5 h-5 mr-2" />
                공감 보내기
              </button>
            </div>
            </div>
          </div>
        </div>

        <button className="absolute top-4 right-4">
          <img src={MoreIcon} alt="더보기" />
        </button>
      </div>

      <div className="my-[70px] border-t border-gray-200"></div>

      <div>
        <div className='flex gap-3 justify-start items-center mb-3'>
          <h2 className="text-2xl font-semibold text-black">
            <span className="text-darkViolet">달봉이네 가족</span>의 추억 목록
          </h2>
          <button>
            <img src={AddIcon} alt="추억 추가" />
          </button>
        </div>

        <GroupTab />
        <div className="flex mt-4 items-center gap-5">
          <Select options={options} onSelect={handleSelect} />
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

 
        <div className="p-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
