import {IoClose} from "react-icons/io5";


export default function PasswordChange({onClose}) {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-[470px] bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">비밀번호 변경</h2>
            <button onClick={onClose}>
              <IoClose size={24} className="text-black"/>
            </button>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-black">현재 비밀번호</label>
            <input
                type="text"
                placeholder="현재 비밀번호를 입력해 주세요."
                className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                        outline-none transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-black">신규 비밀번호</label>
            <input
                type="text"
                placeholder="변경할 비밀번호를 입력해 주세요."
                className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                        outline-none transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-black">신규 비밀번호 재확인</label>
            <input
                type="text"
                placeholder="변경할 비밀번호를 한 번 더 입력해 주세요."
                className="w-full mt-1 p-2.5 border border-darkGray-hover rounded-md text-sm placeholder-gray-400
                        focus:border-normalViolet focus:ring-2 focus:ring-normalViolet
                        outline-none transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
                className="px-5 py-2 bg-normalViolet hover:bg-normalViolet-hover active:bg-normalViolet-active text-white text-sm font-medium rounded-md">
              수정
            </button>
          </div>
        </div>
      </div>
  )
}