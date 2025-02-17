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
const NotFound = lazy(() => import("@/pages/NotFound"));

const routesConfig = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <Suspense fallback={<LoadingSpinner size={200} />}><Main /></Suspense> }, 
      { path: "group", element: <Suspense fallback={<LoadingSpinner size={200} />}><Group /></Suspense> },
      { path: "group/:groupId", element: <Suspense fallback={<LoadingSpinner size={200} />}><GroupDetail /></Suspense> },
      { path: "group/:groupId/post/:postId", element: <Suspense fallback={<LoadingSpinner size={200} />}><MemoryPost /></Suspense> },
      { path: "notice", element: <Suspense fallback={<LoadingSpinner size={200} />}><Notice /></Suspense> },
      { path: "notice/:noticeId", element: <Suspense fallback={<LoadingSpinner size={200} />}><NoticeDetail /></Suspense> },
      { path: "scrap", element: <Suspense fallback={<LoadingSpinner size={200} />}><Scrap /></Suspense> },
      { path: "mypage", element: <Suspense fallback={<LoadingSpinner size={200} />}><Mypage /></Suspense> },
    ],
  },
  { path: "/login", element: <Suspense fallback={<LoadingSpinner size={200} />}><Login /></Suspense> },
  { path: "*", element: <Suspense fallback={<LoadingSpinner size={200} />}><NotFound /></Suspense> }, 
];

export default routesConfig;
