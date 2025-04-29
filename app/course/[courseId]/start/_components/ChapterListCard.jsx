import React from 'react'
import { HiOutlineClock } from "react-icons/hi";


const ChapterListCard = ({chapter, index}) => {
  return (
    <div className='grid grid-cols-5 p-4 items-center border-b '>
      <div>
        <h2 className='p-1 bg-primary text-white w-8 h-8 rounded-full text-center'>{index+1}</h2>
      </div>

      <div className='col-span-4 '>
        <h2 className='font-bold text-[15px] mb-1'>{chapter.ChapterName}</h2>
        <h2 className='flex items-center text-sm text-primary gap-2'><HiOutlineClock />{chapter.Duration}</h2>
      </div>
    </div>
  )
}

export default ChapterListCard


