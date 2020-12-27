import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className='outer-ring'>
      <span id='inner-ring' />
    </div>
  )
}

export default LoadingSpinner
