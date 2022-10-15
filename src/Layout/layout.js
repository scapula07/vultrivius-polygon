import React from 'react'
import Header from '../components/Header'
import Footer from './footer'
export default function Layout({children}) {
  return (
    <div className="layout bg-black h-screen text-white px-8 overflow-x-hidden">
      <Header />
    <div className="page ">
      {children}
    </div>
    <div className='pt-32'>
      <Footer />
    </div>
</div>
  )
}
