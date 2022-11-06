import React, { useContext, useEffect, useState } from "react"
import { db } from "../firebase/Config"
import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuth } from "./AuthContext";

const FireStoreContext = React.createContext()

export const useDb = () => {
    return useContext(FireStoreContext)
}

export const FireSotreProvider = ({ children }) => {
    const { user } = useAuth()
    const [fireStoreCurrentUser, setFireStoreCurrentUser] = useState()

    const fireStoreUsersQuery = collection(db, `Users`)
    const [firestoreUsers] = useCollectionData(fireStoreUsersQuery)

    useEffect(() => {
        firestoreUsers?.filter(FilterdFirestoreUser => {
            if (FilterdFirestoreUser.email === user.email) {
                return FilterdFirestoreUser
            } else {
            }
        }).map(firestoreMappedUser => {
            setFireStoreCurrentUser(firestoreMappedUser)
        })
    }, [firestoreUsers, user])

    const value = { fireStoreCurrentUser }
    return (
        <FireStoreContext.Provider value={value}>
            {children}
        </FireStoreContext.Provider>
    )
}