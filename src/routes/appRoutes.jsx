import { createBrowserRouter } from "react-router-dom";
import Sidebar from "@/layouts/Sidebar";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      { path: "/", element: <Main /> },
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
