import React from 'react'
import { handleAuthentication } from '../utils/auth'
import Layout from '../components/Layout/Layout'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const Callback = () => {
  handleAuthentication()

  return (
    <Layout>
      <LoadingSpinner />
    </Layout>
  )
}

export default Callback