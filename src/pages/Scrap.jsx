import {useEffect, useState} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import {useToast} from "@/hooks/useToast.js";


import scrapService from "@/services/scrap/scrapService.js";

import NoScrapIcon from "@/assets/icon/scrap/no-scrap.svg";

import PublicPostCard from '@/components/group/PublicPostCard';
import Pagination from "@/components/common/Pagination";
import SearchBar from "@/components/common/SearchBar";
import SearchButton from "@/components/common/SearchButton";
import Select from '@/components/common/Select';
import NeedLoginToGuest from "@/components/modal/NeedLoginToGuest.jsx";

const GROUP_PARAMS = 'group';


const options = [
  { label: "최신순", value: "latest" },
  { label: "추억 많은 순", value: "mostPosted" },
  { label: "배지 많은 순", value: "mostBadge" },
  { label: "공감순", value: "mostLiked" }
];


export default function Scrap () {
  const [isLogin, setIsLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "mostLiked");
  const [totalPages, setTotalPages] = useState(10);
  const [memories, setMemories] = useState([]);
  const tabName = searchParams.get(GROUP_PARAMS) || 'Public';

  const navigate = useNavigate();
  const addToast = useToast();

  /** 로그인 유무 판단 **/
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  /** 스크랩한 추억글 목록 불러오기 **/
  useEffect(() => {
    const fetchScrapList = async() => {
      try{
        const response = await scrapService.getScrapList({
          sortBy,
          keyword: searchTerm,
          page: currentPage,
        });

        if (response.status === "success"){
          setMemories(response.data.data || []);
          setTotalPages(response.data.totalPages);
        } else{
          throw new Error("스크랩한 추억글 조회 실패");
        }

      } catch{
        if(isLogin) addToast("스크랩한 추억글 조회에 실패했습니다.");
      }
    }

    fetchScrapList();
  },[searchTerm, sortBy, currentPage]);

  useEffect(() => {
    setSortBy(searchParams.get("sortBy") || "mostLiked");
  }, [searchParams]);

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

  const handleLoginModal = (state) => {
    if(state === "register") {
      navigate("/login");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="max-w-[95%] h-full pt-3 pb-7">
      <div className="flex items-center mb-2">
        <span className="text-darkViolet text-2xl font-semibold">스크랩</span>
        <span className="text-black text-2xl font-semibold">한 추억 글 목록</span>
      </div>

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
        {memories.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {memories.map((memory) =>
                  <PublicPostCard
                      key={memory.postId}
                      id={memory.postId}
                      groupId={memory.post?.groupId}
                      title={memory.post?.title || "제목 없음"}
                      tag={memory.post?.tag.length ? memory.post?.tag : ["태그 없음"]}
                      moment={dayjs(memory.post?.moment).format('YYYY-MM-DD')}
                      author={memory.post?.nickname || "알 수 없음"}
                      imageUrl={memory.post?.imageUrl ? `https://${memory.post.imageUrl}` : null}
                      location={memory.post?.location || "장소 정보 없음"}
                      likeCount={memory.post?.likeCount ?? 0}
                      commentCount={memory.post?.commentCount ?? 0}
                  />)}
            </div>
        ):(
            <div className="bg-white min-w-[85vw] h-[80vh] max-h-[80vh] w-full rounded-[30px]">
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <img src={NoScrapIcon} alt="No Group" className="w-30 h-30 mb-4"/>
                <p className="text-lg font-semibold">스크랩된 추억글이 없습니다!</p>
                <p className="text-sm text-gray-400">가입된 그룹에서 마음에 드는 추억글을 스크랩 해보세요!</p>
                <button onClick={() => navigate("/group")} className="mt-4 px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
                  그룹 살펴보기
                </button>
              </div>
            </div>
        )}
      </div>

      {memories.length > 0 && <div className="p-4">
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </div>}
      {!isLogin && <NeedLoginToGuest onClick={handleLoginModal}/>}
    </div>
  );
}
