import React from 'react'
import { Navigate } from 'react-router-dom'

function WithAuth({children}) {
    const token = localStorage.getItem('token')
    if(!token) {
        return <Navigate to='/login' replace></Navigate>
    }
  return (
    children
  )
}

export default WithAuth