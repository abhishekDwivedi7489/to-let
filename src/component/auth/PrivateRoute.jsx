import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {token} = useSelector((state) => state.auth)
    if(token)
     {
        return children
     }
     else
     <Navigate to={"/login"}/>
}

export default PrivateRoute