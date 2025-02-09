import { createBrowserRouter } from "react-router-dom";
import Sidebar from "@/layouts/Sidebar";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import Group from "@/pages/Group";
import Notice from "@/pages/Notice";
import Scrap from "@/pages/Scrap";
import Mypage from "@/pages/Mypage";
import NotFound from "@/pages/NotFound";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/group", element: <Group /> },
      { path: "/notice", element: <Notice /> },
      { path: "/scrap", element: <Scrap /> },
      { path: "/mypage", element: <Mypage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default appRoutes;
