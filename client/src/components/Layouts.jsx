import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layouts({children}) {
  return (
    <>
    <Navbar />
    {children}
    <Footer />
</>
  )
}

export default Layouts