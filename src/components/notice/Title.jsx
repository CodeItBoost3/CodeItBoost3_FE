export default function Title({title, subtitle}) {
  return (
      <div className="flex items-center mb-7">
        <span className="text-darkViolet text-2xl font-semibold">{title}</span>
        <span className="text-black text-2xl font-semibold">&nbsp;{subtitle}</span>
      </div>
  )
}