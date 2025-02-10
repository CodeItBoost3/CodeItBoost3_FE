import { forwardRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = forwardRef(
  (
    {
      name,
      placeholder,
      width = "w-[422px]",
      height = "h-[40px]",
      onChange,
      onEnter,
      value,
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const handlePressEnter = (e) => {
      if (e.key === "Enter" && onEnter) {
        onEnter();
      }
    };

    const onToggleFocus = (focus) => setIsFocus(focus);

    return (
      <label
        className={`flex items-center justify-between rounded-full bg-white hover:text-black hover:outline hover:outline-1 hover:outline-gray-300 ${width} ${height} px-4 ${
          !isFocus && "text-gray-400"
        }`}
        htmlFor={name}
      >
        {!isFocus && <FaMagnifyingGlass />}
        <input
          ref={ref}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => onToggleFocus(true)}
          onBlur={() => onToggleFocus(false)}
          onKeyPress={handlePressEnter}
          className="ml-2 border-none px-0 bg-transparent outline-none w-full"
        />
      </label>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
