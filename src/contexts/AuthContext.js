import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/Config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, updateDoc } from "firebase/firestore";
// import { doc, setDoc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useNavigate } from "react-router";
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({ children }) => {

    const [user, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState(false)

    const navigate = useNavigate()


    const EmailAndPasswordSignup = (email, password, name, number, url, gender) => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: url
            }).then(() => {
                setDoc(doc(db, "Users", email.toLowerCase()), {
                    email,
                    name,
                    photoURL: url,
                    number,
                    gender,
                    firebaseUID: auth.currentUser.uid,
                    uid: uuidv4().slice(-5),
                }).then(() => {
                    navigate('/')
                })
            }).catch(() => {
                alert('Failed To Update Your Profile')
            })
        }).catch((error) => {
            setAuthError(error.message)
        })
    }

    const EmailAndPasswordLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/')
        }).catch((error) => {
            setAuthError(error.message)
        })
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubsrice = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(true)
        })
        return unsubsrice
    }, [])

    useEffect(() => {
        if (user) {
            if (user.photoURL) {
                updateDoc(doc(db, "Users", user.email.toLowerCase()), {
                    photoURL: user.photoURL,
                })
            }
        }
    },[user])

    const value = {
        EmailAndPasswordSignup,
        EmailAndPasswordLogin,
        user,
        authError,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}