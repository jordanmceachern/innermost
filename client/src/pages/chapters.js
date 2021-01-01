import React, { useEffect, useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout/Layout'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const Chapters = () => {
  const [tableOfContents, setTableOfContents] = useState([])
  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            name
            extension
            dir
          }
        }
      }
    }
  `)

  useEffect(() => {
    const numberOfFiles = data?.allFile?.edges?.length
    const chapterList = []

    if (numberOfFiles > 0) {
      for (let i = 1; i <= numberOfFiles; i++) {
        chapterList.push(<li key={i}><Link to={`/chapters/chapter-${i}`}>Chapter {i}</Link></li>)
      }
      setTableOfContents(chapterList)
    }
  }, [data])

  return (
    <Layout>
      <main>
        <title>Chapters</title>
        <h1>
          Table of Contents
        </h1>
        <ul className='table-of-contents'>
          {
            (tableOfContents.length === 0) && (
              <li><LoadingSpinner /></li>
            )
          }
          {
            (tableOfContents.length !== 0) && (
              tableOfContents
            )
          }
        </ul>
      </main>
    </Layout>
  )
}

export default Chapters
