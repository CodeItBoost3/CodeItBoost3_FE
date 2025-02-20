export default function ProfileEditCard({title, content}) {
  return (
      <div className="w-[20vw] h-32 cursor-pointer bg-white p-6 rounded-tl-2xl rounded-tr-2xl rounded-bl-sm rounded-br-2xl border-darkWhite">
        <p className="text-[18px] text-darkViolet font-semibold">{title}</p>
        <p className="text-[16px] font-semibold text-black pt-3">{content}</p>
      </div>
  )
}