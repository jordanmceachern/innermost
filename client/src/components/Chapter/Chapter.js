import React from 'react'
import { Link } from 'gatsby'
import Layout from '../Layout/Layout'

const Chapter = props => {
  console.log('Chapter props: ', props)
  return (
    <Layout>
      <main>
        <title>About</title>
        <h1>
          Living in a Video Game 'Chapter' page TBD
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

export default Chapter
