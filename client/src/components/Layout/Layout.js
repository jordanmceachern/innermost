import React from 'react'
import { Link } from 'gatsby'
import './Layout.css'

const Layout = props => {
  const isHomePage = window.location.pathname === '/'
  return (
    <div className='app-container'>
      {props.children}
      <footer>
        {
          !isHomePage && (
            <p className='return-to-home'>
              <Link to='/'>
                Return to Home
              </Link>
            </p>
          )
        }
        <p>
          &copy; Copyright {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default Layout
