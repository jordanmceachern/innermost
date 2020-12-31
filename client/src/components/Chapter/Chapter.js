import React from 'react'
import { Link } from 'gatsby'
import Layout from '../Layout/Layout'

const Chapter = props => {
  const { pageContext } = props
  const { content, chapterNumber } = pageContext
  const pageTitle = 'Chapter ' + chapterNumber
  //
  return (
    <Layout>
      <main>
        <title>{pageTitle}</title>
        <h1>
          {pageTitle}
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
