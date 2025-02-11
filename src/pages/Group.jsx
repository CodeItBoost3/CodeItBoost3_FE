import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import image from '@/assets/icon/main/default-image.png';

import GroupTab from '@/components/group/GroupTab';
import PrivateGroupCard from '@/components/common/PrivateGroupCard';
import PublicGroupCard from '@/components/common/PublicGroupCard';
import Pagination from "@/components/common/Pagination";
import SearchBar from "@/components/common/SearchBar";
import SearchButton from "@/components/common/SearchButton";
import Select from '@/components/common/Select';

const GROUP_PARAMS = 'group';

const publicGroupData = [
  { id: 1, title: "그룹 1", description: "설명 1", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 2, title: "그룹 2", description: "설명 2", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 3, title: "그룹 3", description: "설명 3", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 4, title: "그룹 4", description: "설명 4", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 5, title: "그룹 5", description: "설명 5", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 6, title: "그룹 6", description: "설명 5", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 7, title: "그룹 7", description: "설명 5", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 8, title: "그룹 8", description: "설명 5", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
];

const privateGroupData = [
  { id: 1, title: "그룹 1", description: "설명 1", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 2, title: "그룹 2", description: "설명 2", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 3, title: "그룹 3", description: "설명 3", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 4, title: "그룹 4", description: "설명 4", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 5, title: "그룹 5", description: "설명 1", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 6, title: "그룹 6", description: "설명 2", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 7, title: "그룹 7", description: "설명 3", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 8, title: "그룹 8", description: "설명 4", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 9, title: "그룹 9", description: "설명 1", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 10, title: "그룹 10", description: "설명 2", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 11, title: "그룹 11", description: "설명 3", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 12, title: "그룹 12", description: "설명 4", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 13, title: "그룹 13", description: "설명 1", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 14, title: "그룹 14", description: "설명 2", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 15, title: "그룹 15", description: "설명 3", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
  { id: 16, title: "그룹 16", description: "설명 4", image: image, picturecount: "5", emotioncount: "3", badgecount: "5", days: "D+251" },
];

const options = ["최신순", "공감순", "조회순"];

export default function Group() {
  const [searchParams] = useSearchParams();
  const tabName = searchParams.get(GROUP_PARAMS) || 'Public';
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const totalPages = 10;

  const handleSearch = () => {
    console.log("검색어:", searchTerm);
  };

  const handleSelect = (selected) => {
    console.log("선택된 옵션:", selected);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[95%] h-full pt-3 pb-7">
      <div className="flex items-center mb-2">
        <span className="text-darkViolet text-2xl font-semibold">조각</span>
        <span className="text-black text-2xl font-semibold">그룹 목록</span>
      </div>

      <GroupTab />
      <div
        className="flex mt-4 items-center gap-5"
        style={{ flexBasis: '60%' }}
      >
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

      <div className="w-full mt-3 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabName === 'Public'
            ? publicGroupData.map((group) => (
                <PublicGroupCard
                  id={group.id}
                  key={group.id}
                  title={group.title}
                  description={group.description}
                  image={group.image}
                  picturecount={group.picturecount}
                  emotioncount={group.emotioncount}
                  badgecount={group.badgecount}
                  days={group.days} 
                />
              ))
            : privateGroupData.map((group) => (
                <PrivateGroupCard
                  id={group.id}
                  key={group.id} 
                  title={group.title}
                  days={group.days} 
                  emotioncount={group.emotioncount}
                  picturecount={group.picturecount}
                />
              ))}
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
