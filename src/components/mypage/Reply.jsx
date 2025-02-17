export default function ProfileEditCard({title, content}) {
  return (
      <div className="w-[20vw] h-32 bg-white p-6 rounded-tl-2xl rounded-tr-2xl rounded-bl-sm rounded-br-2xl border-darkWhite">
        <p className="text-xs text-darkViolet font-semibold">{title}</p>
        <p className="text-xs font-semibold text-black pt-3">{content}</p>
      </div>
  )
}