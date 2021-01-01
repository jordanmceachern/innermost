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
              <Link to='/' title='Go back to the main menu'>
                Return to Home
              </Link>
            </p>
          )
        }
        <p className='copyright'>
          &copy; Copyright {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default Layout
