import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './Chapter.css'

const Chapter = props => {
  const [chapterLines, setChapterLines] = useState([])
  const [currentLine, setCurrentLine] = useState(null)
  const [currentLineNumber, setCurrentLineNumber] = useState(0)
  const { pageContext } = props
  const { content, chapterNumber } = pageContext
  const pageTitle = 'Chapter ' + chapterNumber
  //
  // Manipulate the current line before saving in state
  const formatCurrentLine = number => {
    const currentSpanStr = chapterLines[number].slice(1)
    const lineTextStart = currentSpanStr.indexOf('>') + 1
    const lineTextEnd = currentSpanStr.indexOf('<')
    let rawLine = currentSpanStr.slice(lineTextStart, lineTextEnd)
    //
    rawLine = rawLine.replaceAll('&rsquo;', '\'')
    rawLine = rawLine.replaceAll('&lsquo;', '\'')
    rawLine = rawLine.replaceAll('&#39;', '\'')
    rawLine = rawLine.replaceAll('&rdquo;', '"')
    rawLine = rawLine.replaceAll('&ldquo;', '"')
    rawLine = rawLine.replaceAll('&quot;', '"')
    //
    if (rawLine.length === 0) {
      rawLine = '...'
    }
    //
    return rawLine
  }
  const animateLineOutput = async line => {
    const lineArr = line.split('')
    const renderedLineArr = []
    let displayedText = ' '
    //
    setCurrentLine(displayedText)
    //
    let i = 0
    const timer = setInterval(() => {
      renderedLineArr.push(lineArr[i])

      displayedText = renderedLineArr.join('')
      setCurrentLine(displayedText)
      i++
      if (i === lineArr.length) {
        clearInterval(timer)
      }
    }, 50)
  }

  const changeLine = iterator => {
    const stagedNumber = currentLineNumber + iterator
    const stagedCurrentLine = formatCurrentLine(stagedNumber)
    //
    setCurrentLineNumber(stagedNumber)
    animateLineOutput(stagedCurrentLine)
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
    if (chapterLines.length > 0 && (currentLineNumber === 0)) {
      const rawLine = formatCurrentLine(0)
      animateLineOutput(rawLine)
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
                  {currentLine}
                </p>
                <div className='change-text-btn-container'>
                  {
                    (currentLineNumber !== 0) && (
                      <span className='change-text-btn' onClick={backLine} title='click to read the previous line'>
                        Back
                      </span>
                    )
                  }
                  {
                    (currentLineNumber !== (chapterLines.length - 1)) && (
                      <span className='change-text-btn' onClick={nextLine} title='click to read the next line'>
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
