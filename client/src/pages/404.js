import * as React from 'react'
import { Link } from 'gatsby'

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif'
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 48,
  maxWidth: 320
}
const returnLinkStyles = {
  color: 'inherit',
  fontWeight: '700'
}
const paragraphStyles = {
  marginBottom: 48
}

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        There was a problem finding the files needed to load "Living in a Video Game", please try again or return to the main menu.
      </p>
      <div>
        <a href='.' style={{ ...returnLinkStyles, marginRight: '1rem' }}>Refresh Page</a>
        <Link to='/' style={returnLinkStyles}>Main Menu</Link>
      </div>
    </main>
  )
}

export default NotFoundPage
