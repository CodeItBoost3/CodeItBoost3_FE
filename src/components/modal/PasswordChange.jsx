import { useState } from "react";
import { IoClose } from "react-icons/io5";

import { useToast } from "@/hooks/useToast";

import userService from "@/services/user/userService";

export default function PasswordChange({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const addToast = useToast();

  const handleChangePassword = async () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      addToast("모든 필드를 입력해 주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await userService.updatePassword(currentPassword, newPassword);
      addToast("비밀번호가 성공적으로 변경되었습니다.");
      onClose();

    } catch {
      addToast("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[470px] bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">비밀번호 변경</h2>
          <button onClick={onClose}>
            <IoClose size={24} className="text-black" />
          </button>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력해 주세요."
            className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                    focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                    outline-none transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">신규 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="변경할 비밀번호를 입력해 주세요."
            className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                    focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                    outline-none transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">신규 비밀번호 재확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="변경할 비밀번호를 한 번 더 입력해 주세요."
            className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                    focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                    outline-none transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleChangePassword}
            className="px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
