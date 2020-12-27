import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout/Layout'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const Chapters = () => {
  return (
    <Layout>
      <main>
        <title>Chapters</title>
        <h1>
          Living in a Video Game 'Chapters' page TBD
        </h1>
        <ul>
          <li>
            <Link to='/chapter-one'>
              Chapter One
            </Link>
          </li>
          <li>
            <Link to='/'>
              Main Menu
            </Link>
          </li>
          <li>
            <LoadingSpinner />
          </li>
        </ul>
      </main>
    </Layout>
  )
}

export default Chapters
