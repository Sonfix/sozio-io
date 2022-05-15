import React from "react"
import { Route, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  let location = useLocation();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Navigate to={{
            pathname: "/",
            state: { from: location }
        }} />
      }}
    ></Route>
  )
}