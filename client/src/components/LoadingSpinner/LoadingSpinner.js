import React from 'react'
import './LoadingSpinner.css'

// Generic loading spinner to use anywhere

const LoadingSpinner = () => {
  return (
    <div className='outer-ring'>
      <span id='inner-ring' />
    </div>
  )
}

export default LoadingSpinner
