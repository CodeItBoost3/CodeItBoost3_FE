import {useEffect, useState} from "react";
import ArrowDownIcon from '@/assets/icon/main/arrow-down.svg';
import ArrowUpIcon from '@/assets/icon/main/arrow-up.svg';

function MemoryCard({ title, date, memory, sympathy, comments, index }) {
   const [isOpen, setIsOpen] = useState(false);

   const handleMemoryCard = () => {
     setIsOpen(!isOpen);
   }

  useEffect(() => {
    if(index === 0){
      setIsOpen(true);
    }
  },[])

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3.5">
            <div className="text-black text-sm font-medium">{title}</div>
            <div className="text-darkGray-active text-sm font-normal">{date}</div>
          </div>
          {!isOpen && <img src={ArrowDownIcon} onClick={handleMemoryCard}/>}
        </div>
        {isOpen && <div className="w-full font-normal bg-lightGray rounded-[17.33px]">
          <div className="flex justify-between items-center relative box-border pb-5">
            <img src={ArrowUpIcon} className="absolute top-2.5 right-3.5" onClick={handleMemoryCard}/>
            <div className="text-darkGray-active text-sm flex flex-col gap-2 pl-6 pt-9">
              <p>추억</p>
              <p>공감</p>
              <p>댓글</p>
            </div>
            <div className="flex text-sm text-black flex-col gap-2 pr-14 pt-9">
              <p>{memory}</p>
              <p>{sympathy}</p>
              <p>{comments}</p>
            </div>
          </div>
        </div>}
      </div>
    );
  }
  
  export default MemoryCard;
  