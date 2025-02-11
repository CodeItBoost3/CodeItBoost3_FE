export default function ListHeader() {
  return (
      <thead>
      <tr className="border-b">
        <th className="w-[5%] text-darkGray text-xs font-medium pb-3 pt-3 bg-white border-r rounded-tl-lg">No</th>
        <th className="w-[70%] text-darkGray text-xs font-medium pb-3 pt-3  bg-white border-r">공지사항 제목</th>
        <th className="w-[14%] text-darkGray text-xs font-medium pb-3 pt-3  bg-white border-r">생성 날짜</th>
        <th className="w-[11%] text-darkGray text-xs font-medium pb-3 pt-3  bg-white border-r rounded-tr-lg">조회수</th>
      </tr>
      </thead>
  );
}