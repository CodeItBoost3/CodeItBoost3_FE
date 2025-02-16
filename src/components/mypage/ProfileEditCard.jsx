import EditIcon from "@/assets/icon/mypage/edit.svg";
import Image from "@/assets/image/profile-sample.jpg";
import ProfileEditList from "@/components/mypage/ProfileEditList.jsx";

const data = [
  {id:1, title: "닉네임", data: "홍길동"},
  {id:2, title: "아이디", data: "gildeong32"},
  {id:3, title: "비밀번호", data: "*인증필요"},
];
export default function ProfileEditCard() {
  return (
      <div className="w-[29vw] min-h-[30vh] h-auto bg-white rounded-lg border border-normalGray relative p-7">
        <button className="absolute right-4 top-3.5 w-5 h-5 bg-white rounded-full shadow-card p-1"><img src={EditIcon}/>
        </button>
        <div className="flex items-center gap-2.5 border-b border-gray-200 pb-2.5">
          <div className="w-[46px] h-[46px] overflow-hidden rounded-full"><img className="object-cover w-full h-full" src={Image}/></div>
          <p className="text-xs text-gray-800 font-normal">홍길동</p>
        </div>
        <div className="pt-0.5">
          {data.map((item, idx) => (
              <ProfileEditList
                  key={idx}
                  title={item.title}
                  data={item.data}/>
          ))}
        </div>
        <div className="flex w-full align-middle justify-end pt-3.5">
          <p className="cursor-pointer text-darkGray-active text-[9px] font-normal">로그아웃</p>
          <span className="mx-2 relative after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-px after:h-2 after:bg-darkGray-active after:-translate-y-1/2"/>
          <p className="cursor-pointer text-darkGray-active text-[9px] font-normal">회원탈퇴</p>
        </div>
      </div>
  );
}
