import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout/Layout'

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <title>Main Menu</title>
        <h1>
          Welcome to Living in a Video Game
        </h1>
        <ul>
          <li>
            <Link to='/chapters/chapter-1'>
              Begin the story
            </Link>
          </li>
          <li>
            <Link to='/chapters'>
              Select Chapter
            </Link>
          </li>
          <li>
            <Link to='/about'>
              About Living in a Video Game
            </Link>
          </li>
        </ul>
      </main>
    </Layout>
  )
}

export default IndexPage
