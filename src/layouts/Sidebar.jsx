import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex h-screen">
      <div className="w-[250px] bg-gray-200 p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
      </div>

      <div className="flex-1 p-4 bg-white">
        <Outlet />
      </div>
    </div>
  );
}
