import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Select = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].value); // ✅ value만 저장

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  };

  return (
    <div className="relative w-full max-w-[200px]">
      {/* 선택된 옵션 */}
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border active:border-gray-300 rounded-xl"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{options.find(opt => opt.value === selectedOption)?.label}</span> {/* ✅ label 렌더링 */}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* 드롭다운 옵션 리스트 */}
      {isOpen && (
        <ul className="absolute left-0 px-1 py-1 z-10 w-full mt-2 bg-white border rounded-lg border-gray-300 shadow-md">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 m-1 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selectedOption === option.value ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
