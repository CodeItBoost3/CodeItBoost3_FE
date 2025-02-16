export default function ProfileEditList({title, data}) {
  return (
      <div className="flex justify-between pb-4 pt-4 border-b border-gray-100 align-middle">
        <p className="text-black text-xs font-normal">{title}</p>
        <p className="text-darkGray-active text-xs font-normal">{data}</p>
      </div>
  );
}