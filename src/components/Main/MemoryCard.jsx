function MemoryCard({ title, date, memory, sympathy, comments }) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-black text-sm font-medium">{title}</div>
          <div className="text-darkGray-active text-sm font-normal">{date}</div>
        </div>
        <div className="w-full font-normal bg-lightGray rounded-[17.33px] p-4">
          <div className="flex justify-between items-center">
            <div className="text-darkGray-active text-sm flex flex-col gap-2">
              <p>추억</p>
              <p>공감</p>
              <p>댓글</p>
            </div>
            <div className="flex text-sm text-black flex-col gap-2">
              <p>{memory}</p>
              <p>{sympathy}</p>
              <p>{comments}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default MemoryCard;
  