import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function PrivateGroupModal({ onClose, onSubmit }) {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password.trim() === "") return;
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-[450px] bg-white rounded-2xl p-6 shadow-lg">
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">비공개 그룹</h2>
          <button onClick={onClose}>
            <IoClose size={24} className="text-black" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          *비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.
        </p>

        <div className="mt-5">
          <label className="block text-sm font-medium text-black">
            비밀번호 입력
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="그룹 비밀번호를 입력해 주세요."
            className="w-full mt-1 p-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet 
                        outline-none transition-all duration-200 ease-in-out"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleSubmit}
            disabled={!password}
            className="px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active hover:bg-lightViolet-hover active:bg-lightViolet-active text-white text-sm font-medium rounded-md disabled:bg-normalGray"
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}
