import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import PublicPostCard from "@/components/group/PublicPostCard.jsx";
import ProfileEditCard from "@/components/mypage/ProfileEditCard.jsx";
import MemoryAction from "@/components/main/MemoryAction.jsx";
import GroupCard from "@/components/mypage/GroupCard.jsx";
import Reply from "@/components/mypage/Reply.jsx";
import EditProfile from "@/components/modal/EditProfile.jsx";
import PassWordChange from "@/components/modal/PasswordChange.jsx";
import NeedLoginToGuest from "@/components/modal/NeedLoginToGuest.jsx";

import userService from "@/services/user/userService";

import NoArticleIcon from "@/assets/icon/main/edit.svg";
import defaultComment from "@/assets/icon/group/no-comment.svg";
import ArrowLeftIcon from "@/assets/icon/mypage/arrow-left.svg";
import ArrowRightIcon from "@/assets/icon/mypage/arrow-right.svg";

import {useToast} from "@/hooks/useToast";
import {Navigation} from "swiper/modules";

export default function Mypage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("예비 사용자");
  const [isTimeoutPassed, setIsTimeoutPassed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondeModalVisible, setSecondeModalVisible] = useState(false);
  const [publicMemories, setPublicMemories] = useState([]);
  const [repliyDatas, setRepliyDatas] = useState([]);
  const [isBeginning, setIsBeginning] = useState(false); // 이전 버튼 활성화 여부
  const [isEnd, setIsEnd] = useState(true); // 이후 버튼 활성화 여부
  const addToast = useToast();
  const navigate = useNavigate();
  const postPrevRef = useRef(null);
  const postNextRef = useRef(null);
  const replyPrevRef = useRef(null);
  const replyNextRef = useRef(null);
  const handleViewAllPosts = () => {
    navigate("/mypage/posts");
  };

  const handleViewAllComments = () => {
    navigate("/mypage/comments");
  };

  const handleLoginModal = (type) => {
    switch (type) {
      case "register":
        navigate("/login");
        break;
      case "guest":
        navigate("/");
        break;
    }
  }

  const handleSwiper = (swiper) => {
    setIsBeginning(swiper.isBeginning); // 시작 슬라이드인지 여부
    setIsEnd(swiper.isEnd); // 마지막 슬라이드인지 여부
  };

  console.log(isBeginning, isEnd);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userService.getUserInfo();
        setNickname(data.data.nickname);
        setIsLogin(true);
      } catch {
        setIsLogin(false);
        if (isLogin) addToast("사용자 정보를 불러올 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();

    const timeout = setTimeout(() => {
      setIsTimeoutPassed(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await userService.getMyPosts(1, 5);
        const posts = response?.data?.posts || [];

        if (posts.length === 0) {
          setPublicMemories([]);
          return;
        }

        setPublicMemories(
            posts.map((post) => ({
              postId: post.postId || null,
              groupId: post.group?.groupId || null,
              title: post.title || "제목 없음",
              content: post.content || "내용 없음",
              tag: Array.isArray(post.tag) ? post.tag : [],
              moment: post.moment
                  ? new Date(post.moment).toLocaleDateString("ko-KR")
                  : "날짜 없음",
              createdAt: post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("ko-KR")
                  : "날짜 없음",
              imageUrl: post?.imageUrl ? `https://${post.imageUrl}` : null,
              likeCount: post.likeCount || 0,
              commentCount: post.commentCount || 0,
              author: post.author?.nickname || "알 수 없음",
              location: post.group?.groupName || "그룹 없음",
            }))
        );
      } catch (error) {
        console.error("내가 작성한 글 불러오기 실패:", error);
        if (isLogin) addToast("내가 작성한 글을 불러오는 데 실패했습니다.");
      }
    };


    const fetchMyComments = async () => {
      try {
        const data = await userService.getMyComments(1, 5);
        const comments = data?.data?.comments || [];

        if (comments.length === 0) {
          setRepliyDatas([]);
          return;
        }

        setRepliyDatas(
            comments.map((comment) => ({
              title: comment.post?.title || "제목 없음",
              content: comment.content || "내용 없음",
            }))
        );
      } catch (error) {
        console.error("내가 작성한 댓글 불러오기 실패:", error);
        if (error.response?.status !== 200 && isLogin) {
          addToast("내가 작성한 댓글을 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchMyPosts();
    fetchMyComments();
  }, []);

  if (isLoading || !isTimeoutPassed) {
    return (
        <div className="flex items-center justify-center w-full h-screen">
          <LoadingSpinner size={200}/>
        </div>
    );
  }

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleVerfiyChange = () => {
    setModalVisible(false);
    setSecondeModalVisible(true);
  };
  if (isLoading) {
    return (
        <div className="flex items-center justify-center w-full h-screen">
          <LoadingSpinner size={200}/>
        </div>
    );
  }

  return (
      <div className="w-full h-full pt-3 pb-7">
        <div className="flex items-center mb-6">
          <span className="text-darkViolet text-2xl font-semibold">{nickname}</span>
          <span className="text-black text-2xl font-semibold">님, 안녕하세요!</span>
        </div>

        <div className="flex gap-10 max-w-[93%]">
          <ProfileEditCard onClickEdit={handleEdit}/>
          <MemoryAction isLogin={isLogin}/>
          <GroupCard/>
        </div>

        {/* 작성한 글 */}
        <div className="flex justify-between items-center mt-7 w-[98%]">
          <p className="text-base font-semibold">작성한 글 모음</p>
          <button onClick={handleViewAllPosts}
                  className="text-darkGray hover:text-darkGray-hover active:text-darkGray-active font-semibold text-xs">
            전체보기
          </button>
        </div>

        <div className="w-full h-auto flex mt-3 relative">
          {publicMemories.length > 0 ? (
              <div className="flex relative">
                {publicMemories.length > 4 && (
                    <div className="h-full flex justify-center items-center gap-2.5 absolute top-0 left-0 pl-4 pr-4 z-10">
                      <img className="cursor-pointer" src={ArrowLeftIcon} ref={postPrevRef} onClick={handleSwiper}/>
                    </div>
                )}
                <Swiper
                    className="custom-swiper max-w-[87vw] w-full overflow-x-auto"
                    modules={[Navigation]}
                    navigation={{
                      // pervEl/nextEl의 경우
                      prevEl: postPrevRef.current,
                      nextEl: postNextRef.current,
                    }}
                    onSwiper={handleSwiper}
                    onSlideChange={(swiper) => handleSwiper(swiper)}
                    spaceBetween={0}
                    breakpoints={{
                      320: {slidesPerView: 1},  // 모바일 (최소 320px): 1개
                      640: {slidesPerView: 2},  // 태블릿 (최소 640px): 2개
                      900: {slidesPerView: 3}, // 데스크탑 (최소 1024px): 3개
                      1000: {slidesPerView: 4}, // 큰 화면 (최소 1280px): 4개
                    }}
                >
                  {publicMemories?.map((memory) => {
                    return (
                        <SwiperSlide key={memory.postId}>
                          <PublicPostCard id={memory.postId} group={memory.groupId} {...memory} />
                        </SwiperSlide>
                    )
                  })}

                </Swiper>
                {publicMemories.length > 4 && (
                    <div
                        className="h-full flex justify-center items-center gap-2.5 absolute top-0 right-[-2%] pl-4 pr-4 z-10">
                      <img className="cursor-pointer" src={ArrowRightIcon} ref={postNextRef} onClick={handleSwiper}/>
                    </div>
                )}
              </div>
          ) : (
              <div
                  className="flex flex-col w-[85vw] items-center bg-white rounded-lg justify-center min-h-[30vh] text-center text-gray-500">
                <img src={NoArticleIcon} alt="No Articles" className="w-30 h-30 mb-8"/>
                <p className="text-lg font-semibold mt-4">최근에 내가 작성한 추억글이 없습니다.</p>
                <p className="text-sm mt-2">조각집에 참여하고 추억글을 작성해보세요!</p>
              </div>
          )}
        </div>


        {/* 작성한 댓글 */}
        <div className="flex justify-between items-center mt-7 max-w-[98%]">
          <p className="text-base font-semibold">작성한 댓글 모음</p>
          <button onClick={handleViewAllComments}
                  className="text-darkGray hover:text-darkGray-hover active:text-darkGray-active font-semibold text-xs">
            전체보기
          </button>
        </div>

        <div className="w-full h-auto flex mt-3 relative">
          {repliyDatas.length > 0 ? (
              <div className="flex relative">
                {repliyDatas.length > 4 && (
                    <div
                        className="h-full flex justify-center items-center gap-2.5 absolute top-0 left-0 pl-4 pr-4 z-10">
                      <img className="cursor-pointer" src={ArrowLeftIcon} ref={replyPrevRef} onClick={handleSwiper}/>
                    </div>
                )}
                <Swiper
                    className="custom-swiper h-full max-w-[87vw] w-full overflow-x-auto"
                    modules={[Navigation]}
                    navigation={{
                      // pervEl/nextEl의 경우
                      prevEl: replyPrevRef.current,
                      nextEl: replyNextRef.current,
                    }}
                    onSwiper={handleSwiper}
                    onSlideChange={(swiper) => handleSwiper(swiper)}
                    spaceBetween={0}
                    breakpoints={{
                      320: {slidesPerView: 1},  // 모바일 (최소 320px): 1개
                      640: {slidesPerView: 2},  // 태블릿 (최소 640px): 2개
                      900: {slidesPerView: 3}, // 데스크탑 (최소 1024px): 3개
                      1000: {slidesPerView: 4}, // 큰 화면 (최소 1280px): 4개
                    }}
                >
                  {repliyDatas?.map((reply, index) => {
                    return (
                        <SwiperSlide key={index}>
                          <Reply key={index} title={reply.title} content={reply.content}/>
                        </SwiperSlide>
                    )
                  })}

                </Swiper>
                {repliyDatas.length > 4 && (
                    <div
                        className="h-full flex justify-center items-center gap-2.5 absolute top-0 right-[-2%] pl-4 pr-4 z-10">
                      <img className="cursor-pointer" src={ArrowRightIcon} ref={replyNextRef} onClick={handleSwiper}/>
                    </div>
                )}
              </div>
          ) : (
              <div
                  className="flex flex-col py-9 w-[85vw] items-center bg-white rounded-lg justify-center text-center text-gray-500 mt-9">
                <img src={defaultComment} alt="작성한 댓글 없음" className="w-30 h-auto"/>
                <p className="text-lg font-semibold mt-7">작성한 댓글이 없습니다.</p>
                <p className="text-sm mt-2">추억 글에 댓글을 등록해 보세요!</p>
              </div>
          )}
        </div>

        {isModalVisible && (
            <EditProfile id={"gildeong32"} nickname={"홍길동"} onClose={() => setModalVisible(false)}
                         onVerfiyChange={handleVerfiyChange}/>
        )}
        {isSecondeModalVisible && <PassWordChange onClose={() => setSecondeModalVisible(false)}/>}
        {!isLogin && <NeedLoginToGuest onClick={handleLoginModal}/>}
      </div>
  );
}
