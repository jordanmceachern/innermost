import React from 'react'
import auth0 from 'auth0-js'
import { navigate, Link } from 'gatsby'

const isBrowser = typeof window !== 'undefined'

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  : {}

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}
  
let user = {}
  
export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }
  
  return localStorage.getItem('isLoggedIn') === 'true'
}
  
export const login = () => {
  if (!isBrowser) {
    return
  }
  
  auth.authorize()
}
  
const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    navigate('/')
    cb()
    return
  }
  
  if (authResult?.accessToken && authResult?.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem('isLoggedIn', true)
    navigate('/')
    cb()
  }
}
  
export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }
  
  auth.parseHash(setSession())
}
  
export const getProfile = () => {
  return user
}

export const AuthRoutes = () => {
  let Routes

  if (isAuthenticated()) {
    Routes = <>
      <li>
        <Link to='/chapters/chapter-1' title='click to start on Chapter 1'>
          Begin the story
        </Link>
      </li>
      <li>
        <Link to='/chapters' title='click to open chapter selection and replay or continue your journey'>
          Select Chapter
        </Link>
      </li>
      <li>
        <span className='link' title='click to log out of this profile'>
          Log out
        </span >
      </li>
    </>
  } else {
    Routes = (
      <li>
        <span className='link' onClick={login} title='click to log in or create a new profile'>
          Log In / New User
        </span>
      </li>
    )
  }

  return Routes
}
