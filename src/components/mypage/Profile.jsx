
export default function GroupList({width = "w-[46px]", height = "h-[46px]" , img}) {
  return (
      <div className={`${width} ${height} overflow-hidden rounded-full`}>
        <img className="object-cover w-full h-full" src={img}/>
      </div>
  )
}