import React, { useContext, useState, useEffect } from "react"


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  function signup(email, password) {
    return true
  }

  function login(email, password) {
    return True
  }

  function logout() {
    return True
  }

  function resetPassword(email) {
    return True
  }

  function updateEmail(email) {
    return True
  }

  function updatePassword(password) {
    return True
  }

  useEffect(() => {
    
  })

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}