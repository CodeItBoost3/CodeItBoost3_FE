import {useRef, useState} from "react";

import PublicPostCard from "@/components/group/PublicPostCard.jsx";
import ProfileEditCard from "@/components/mypage/ProfileEditCard.jsx";
import MemoryAction from "@/components/Main/MemoryAction.jsx";
import GroupCard from "@/components/mypage/GroupCard.jsx";
import Reply from "@/components/mypage/Reply.jsx";
import EditProfile from "@/components/modal/EditProfile.jsx";
import PassWordChange from "@/components/modal/PassWordChange.jsx";

import ArrowLeftIcon from "@/assets/icon/mypage/arrow-left.svg";
import ArrowRightIcon from "@/assets/icon/mypage/arrow-right.svg";

import {smoothScroll} from "@/utils/scrollSmooth.js";

const publicMemories = [
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.01.19', tags: ["태그", "길면", "두줄", "낚시", "인천"], likes: 120, comments: 8 },
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
  { author: "달봉이아들", visibility: "공개", title: '추억 글 제목', location: '인천 앞바다', date: '24.02.01', tags: ["여행", "추억", "가족", "사진"], likes: 98, comments: 12 },
];

const repliyDatas = [
  {title: "글 제목", content: "이거 진짜 좋네요!!(댓글 내용) 저도 한 번 해보고 싶어요 댓글 댓글 댓글 내가 작성한 댓글"},
  {title: "글 제목", content: "이거 진짜 좋네요!!(댓글 내용) 저도 한 번 해보고 싶어요 댓글 댓글 댓글 내가 작성한 댓글"},
  {title: "글 제목", content: "이거 진짜 좋네요!!(댓글 내용) 저도 한 번 해보고 싶어요 댓글 댓글 댓글 내가 작성한 댓글"},
  {title: "글 제목", content: "이거 진짜 좋네요!!(댓글 내용) 저도 한 번 해보고 싶어요 댓글 댓글 댓글 내가 작성한 댓글"},
  {title: "글 제목", content: "이거 진짜 좋네요!!(댓글 내용) 저도 한 번 해보고 싶어요 댓글 댓글 댓글 내가 작성한 댓글"},
]

export default function Mypage() {
  const articlescrollRef = useRef(null);
  const replyScrollRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondeModalVisible, setSecondeModalVisible] = useState(false);
  const length = publicMemories.length;

  const handleEdit = () => {
    setModalVisible(true);
  }

  const handleVerfiyChange = () => {
    setModalVisible(false);
    setSecondeModalVisible(true)
  }

  return (
      <div className="w-full h-full pt-3 pb-7">
        <div className="flex items-center mb-6">
        <span className="text-darkViolet text-2xl font-semibold">
           홍길동
        </span>
          <span className="text-black text-2xl font-semibold">
          님, 안녕하세요!
          </span>
        </div>
        <div className="flex gap-10 max-w-[93%]">
          <ProfileEditCard onClickEdit={handleEdit} />
          <MemoryAction/>
          <GroupCard/>
        </div>
        <div className="flex justify-between items-center mt-7 w-[98%]">
          <p className="text-base font-semibold">작성한 글 모음</p>
          <p className="text-darkGray font-semibold text-xs">전체보기</p>
        </div>
        <div className="w-full h-auto flex mt-3 relative">
          {length > 4 &&
              <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 left-0 pl-4 pr-4">
                <img src={ArrowLeftIcon} onClick={() => smoothScroll(articlescrollRef, -300)}/>
              </div>}
          <div ref={articlescrollRef} className="max-w-[85vw] overflow-x-auto scroll-smooth hide-scrollbar h-full">
            <div className="grid grid-flow-col gap-3 w-max">
              {publicMemories.map((memory, index) => (
                  <PublicPostCard
                      key={index}
                      id={index + 1}
                      group={1}
                      {...memory}
                  />
              ))}
            </div>
          </div>
          {length > 4 &&
              <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 right-[3%] pl-4 pr-4">
                <img src={ArrowRightIcon} onClick={() => smoothScroll(articlescrollRef, 300)}/>
              </div>}
        </div>
        <div className="flex justify-between items-center mt-7 max-w-[98%]">
          <p className="text-base font-semibold">작성한 댓글 모음</p>
          <p className="text-darkGray font-semibold text-xs">전체보기</p>
        </div>
        <div className="w-full h-auto flex mt-3 relative">
          {length > 4 &&
              <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 left-0 pl-4 pr-4">
                <img src={ArrowLeftIcon} onClick={() => smoothScroll(replyScrollRef, -300)}/>
              </div>}
          <div ref={replyScrollRef} className="max-w-[85vw] overflow-x-auto scroll-smooth hide-scrollbar h-full">
            <div className="grid grid-flow-col gap-3 w-max">
              {repliyDatas.map((reply, index) => (
                  <Reply
                      key={index}
                      title={reply.title}
                      content={reply.content}
                  />
              ))}
            </div>
          </div>
          {length > 4 &&
              <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 right-[3%] pl-4 pr-4">
                <img src={ArrowRightIcon} onClick={() => smoothScroll(replyScrollRef, 300)}/>
              </div>}
        </div>
        {isModalVisible &&
            <EditProfile
            id={"gildeong32"}
            nickname={"홍길동"}
            onClose={() => setModalVisible(false)}
            onVerfiyChange={handleVerfiyChange}
        />}
        {isSecondeModalVisible && <PassWordChange onClose={() => setSecondeModalVisible(false)} />}
      </div>
  );
}
  