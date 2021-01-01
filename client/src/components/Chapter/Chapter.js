import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './Chapter.css'

const Chapter = props => {
  const [chapterLines, setChapterLines] = useState([])
  const [currentLine, setCurrentLine] = useState(null)
  const { pageContext } = props
  const { content, chapterNumber } = pageContext
  const pageTitle = 'Chapter ' + chapterNumber
  //
  // Manipulate the current line before saving in state
  const formatCurrentLine = number => {
    const currentSpanStr = chapterLines[number].slice(1)
    const lineTextStart = currentSpanStr.indexOf('>') + 1
    const lineTextEnd = currentSpanStr.indexOf('<')
    return currentSpanStr.slice(lineTextStart, lineTextEnd)
  }
  const changeLine = iterator => {
    const stagedNumber = currentLine.number + iterator
    const stagedCurrentLine = formatCurrentLine(stagedNumber)
    //
    setCurrentLine({
      text: stagedCurrentLine,
      number: stagedNumber
    })
  }
  const backLine = () => changeLine(-1)
  const nextLine = () => changeLine(1)
  //
  // Parse this chapter's matching raw html file and set in state
  useEffect(() => {
    const lines = () => {
      let chapterScript = content.slice()
      let i = 1
      const characterCount = chapterScript.length
      const lines = []
      //
      while (i < characterCount) {
        const nextLineStartIndex = chapterScript.indexOf('<span')
        const nextLineEndIndex = chapterScript.indexOf('</span>') + 7
        //
        if (nextLineStartIndex && nextLineEndIndex) {
          const nextLine = chapterScript.substring(nextLineStartIndex, nextLineEndIndex)
          if (nextLine.includes('span')) {
            lines.push(nextLine)
            chapterScript = chapterScript.slice(nextLineEndIndex)
            i++
          } else {
            i = characterCount
          }
        } else {
          i = characterCount
        }
      }
      if (lines?.length > 0) {
        setChapterLines(lines)
      }
    }
    lines()
  }, [content])
  //
  // Parse and set the first line in state once all lines for the chapter have been set in state
  useEffect(() => {
    if (chapterLines.length > 0) {
      setCurrentLine({
        text: formatCurrentLine(0),
        number: 0
      })
    }
  }, [chapterLines])
  //
  return (
    <Layout>
      <main>
        <title>{pageTitle}</title>
        <h1>
          {pageTitle}
        </h1>
        <div className='main-container'>
          {
            (chapterLines.length === 0) && !currentLine && (
              <LoadingSpinner />
            )
          }
          {
            (chapterLines.length > 0) && currentLine && (
              <div className='dialogue-container'>
                <p className='current-text'>
                  {currentLine.text}
                </p>
                <div className='change-text-btn-container'>
                  {
                    (currentLine.number !== 0) && (
                      <span className='change-text-btn' onClick={backLine}>
                        Back
                      </span>
                    )
                  }
                  {
                    (currentLine.number !== (chapterLines.length - 1)) && (
                      <span className='change-text-btn' onClick={nextLine}>
                        Next
                      </span>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </main>
    </Layout>
  )
}

export default Chapter
