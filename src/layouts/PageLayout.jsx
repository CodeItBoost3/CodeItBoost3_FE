import SideBar from "@/layouts/SideBar";
import Header from "@/layouts/Header";
import { Outlet } from 'react-router-dom';

export default function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background"> 
      <div className="w-full ">
        <Header />
      </div>

      <div className="flex flex-1 min-h-[100vh]">
        <div className="w-[130px] min-w-[130px] flex flex-col items-start px-3 py-2 space-y-4">
          <SideBar />
        </div>
        <div className="flex flex-1 px-[20px] pt-[5%] pb-2">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
