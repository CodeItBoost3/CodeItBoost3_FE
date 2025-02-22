import { lazy, Suspense } from "react";
import PageLayout from "@/layouts/PageLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
const Main = lazy(() => import("@/pages/Main"));
const Login = lazy(() => import("@/pages/Login"));
const Group = lazy(() => import("@/pages/Group"));
const GroupDetail = lazy(() => import("@/pages/GroupDetail"));
const MemoryPost = lazy(() => import("@/pages/MemoryPost"));
const Notice = lazy(() => import("@/pages/Notice"));
const NoticeDetail = lazy(() => import("@/pages/NoticeDetail"));
const Scrap = lazy(() => import("@/pages/Scrap"));
const Mypage = lazy(() => import("@/pages/Mypage"));
const MyPostList = lazy(() => import("@/pages/MyPostList"));
const MyCommentList = lazy(() => import("@/pages/MyCommentList"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

const routesConfig = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><Main /></Suspense> }, 
      { path: "group", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><Group /></Suspense> },
      { path: "group/:groupId", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><GroupDetail /></Suspense> },
      { path: "group/:groupId/post/:postId",errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><MemoryPost /></Suspense> },
      { path: "notice", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><Notice /></Suspense> },
      { path: "notice/:noticeId", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><NoticeDetail /></Suspense> },
      { path: "scrap", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><Scrap /></Suspense> },
      { path: "mypage",errorElement: <ErrorPage />,  element: <Suspense fallback={<LoadingSpinner size={200} />}><Mypage /></Suspense> },
      { path: "mypage/posts", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><MyPostList /></Suspense> },
      { path: "mypage/comments", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><MyCommentList /></Suspense> },
    ],
  },
  { path: "/login", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><Login /></Suspense> },
  { path: "*", errorElement: <ErrorPage />, element: <Suspense fallback={<LoadingSpinner size={200} />}><NotFound /></Suspense> }, 
];

export default routesConfig;
