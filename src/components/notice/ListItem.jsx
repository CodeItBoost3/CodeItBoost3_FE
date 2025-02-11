export default function ListItem({id, title, createdAt, view, onClick, isLast}) {
  return (
      <tr className="even:bg-white border-b last:border-none last:rounded-bl-lg cursor-pointer" onClick={() => onClick(id)}>
        <td className={`w-[5%] text-black pt-4 pb-4 text-sm text-center font-normal border-r
        ${isLast ? "rounded-bl-lg" : ""}`}>
          {id}
        </td>
        <td className="w-[70%] text-black pt-4 pb-4 text-sm text-center font-normal border-r">{title}</td>
        <td className="w-[14%] text-black pt-4 pb-4 text-sm text-center font-normal border-r">{createdAt}</td>
        <td className={`w-[11%] text-black pt-4 pb-4 text-sm text-center font-normal border-r
        ${isLast ? "rounded-br-lg" : ""}`}>
          {view}
        </td>
      </tr>
  );
}