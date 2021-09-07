import * as React from 'react'
import { Link } from 'gatsby'
import { Router } from '@reach/router'
import Layout from '../components/Layout/Layout'
import Chapter from '../components/Chapter/Chapter'
import Chapters from './chapters'
import { AuthRoutes } from '../utils/auth'

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <title>Main Menu</title>
        <h1>
          Welcome to Living in a Video Game
        </h1>
        <div className='main-menu'>
          <ul>
            <AuthRoutes />
            <li>
              <Link to='/about'>
                About Living in a Video Game
              </Link>
            </li>
          </ul>
          <Router>
            <Chapters path='/chapters' />
            <Chapter path='/chapters/*' />
          </Router>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage
