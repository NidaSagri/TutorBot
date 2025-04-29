import { UserInputContext } from '@/app/_context/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput(prev => ({
      ...prev,
      category: category
    }))
  }

  return (
    <div className='px-2 md:px-10 lg:px-20'>
      <h2 className='text-xl text-center font-semibold my-6'>Select a course category</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10'>
        {CategoryList.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col p-4 md:p-5 border items-center 
            rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer transition 
            ${userCourseInput?.category === item.name && 'border-primary bg-blue-50'}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} width={150} height={150} alt='course' className='object-contain' />
            <h2 className='mt-3 text-center font-medium'>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectCategory
