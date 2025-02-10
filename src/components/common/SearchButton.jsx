export default function SearchButton({
  name = "검색",
  onClick,
  className = "",
  type = "button",
  color = "normalViolet",
  children,
  disabled = false,
}) {
  const styleByColor = {
    normalViolet: "bg-normalViolet text-white",
    normalGray: "bg-normalGray text-black",
    lightViolet: "bg-lightViolet text-white",
  };

  const colorStyle = styleByColor[color];

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`rounded-lg ${colorStyle} px-4 py-2 tracking-tight ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {name}
    </button>
  );
}
