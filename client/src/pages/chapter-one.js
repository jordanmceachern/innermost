import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout/Layout'

const ChapterOne = () => {
  return (
    <Layout>
      <main>
        <title>Chapter One</title>
        <h1>
          Living in a Video Game 'Chapter One' page TBD
        </h1>
        <p>
          <Link to='/'>
            Main Menu
          </Link>
        </p>
      </main>
    </Layout>
  )
}

export default ChapterOne
