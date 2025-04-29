"use client"
import React, { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'
import { UserCourseListContext } from '../_context/UserCourseListContext'
import Footer from '../_components/Footer'

const DashboardLayout = ({children}) => {

  const [userCourseList, setUserCourseList] = useState([]);

  return (
    <UserCourseListContext.Provider value={{userCourseList, setUserCourseList}}>
    <div>
        <div className='md:w-64 hidden md:block'>
            <Sidebar/>
        </div>

        <div className='md:ml-64 min-h-screen'>
           <Header dashboardBtn={false}/>
           <div className='p-10'>
           {children}
           </div>
           <Footer className='mt-auto'/>
        </div>
    </div>
    </UserCourseListContext.Provider>
  )
}

export default DashboardLayout
