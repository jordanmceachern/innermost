import React from 'react'
import './Layout.css'

const Layout = props => {
  return (
    <div className='app-container'>
      {props.children}
    </div>
  )
}

export default Layout
