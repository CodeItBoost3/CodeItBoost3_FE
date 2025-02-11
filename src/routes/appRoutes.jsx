import { createBrowserRouter } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import Group from "@/pages/Group";
import Notice from "@/pages/Notice";
import NoticeDetail from "@/pages/NoticeDetail";
import Scrap from "@/pages/Scrap";
import Mypage from "@/pages/Mypage";
import NotFound from "@/pages/NotFound";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <Main /> }, 
      { path: "group", element: <Group /> },
      { path: "notice", element: <Notice /> },
      { path: "notice/:noticeId", element: <NoticeDetail /> },
      { path: "scrap", element: <Scrap /> },
      { path: "mypage", element: <Mypage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> }, 
]);

export default appRoutes;
