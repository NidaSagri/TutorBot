"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/UserInputContext'
import Footer from '../_components/Footer'


const CreateCourseLayout = ({children}) => {

  const [userCourseInput, setUserCourseInput] = useState([]);
  return (

    <div className="flex flex-col min-h-screen"> 
      <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
      <>
      <Header dashboardBtn={true}/>
      {children}
      <Footer/>
      </>
      </UserInputContext.Provider>      
    </div>
  )
}

export default CreateCourseLayout
