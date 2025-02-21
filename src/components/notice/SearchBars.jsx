import SearchBar from "@/components/common/SearchBar.jsx";
import SquareButton from "@/components/common/SearchButton";

export default function SearchBars({ value, onChange, handleSearch }) {
  return (
    <div className="flex items-center gap-8 mb-7">
      <SearchBar
        placeholder="공지사항 제목 검색"
        width="w-full"
        height="h-12"
        value={value}
        onChange={onChange}
        onEnter={handleSearch}
      />
      <SquareButton
        name="검색하기"
        onClick={handleSearch}
        className="h-full whitespace-nowrap font-medium"
      />
    </div>
  );
}
