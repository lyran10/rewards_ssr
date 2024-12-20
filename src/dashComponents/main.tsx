import React from 'react'
import { Header } from './header'
import { Outlet} from 'react-router-dom'

export const Main = () => {

  return (
    <section className='relative p-1 md:p-5 w-full h-[85%] flex justify-center items-start flex-col gap-1 bg-[rgba(234,232,232,1)]'>
      <Header/>
        <div className='flex justify-center items-center w-full h-[85%] gap-3'>
        <Outlet/>
        </div> 
    </section>
  )
}
