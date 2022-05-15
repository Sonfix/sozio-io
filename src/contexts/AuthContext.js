import React, { useContext, useState, useEffect } from "react"
import { auth, store } from "../APIs/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, serverTimestamp, getDocs,  query, where } from 'firebase/firestore';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currentDiagramms, setCurrentDiagramm] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function retrive_users_documents(user) {
    const q = query(collection(store, "diagramms"), where("owner", "==", user.uid));

    const querySnapshot = await getDocs(q);
    
    let _docs = []
    querySnapshot.forEach((doc) => {
      _docs.push(doc.data())      
    });
    setCurrentDiagramm(_docs)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  })

  const value = {
    currentUser,
    currentDiagramms,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}