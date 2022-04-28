import{
    getAuth,
    createUserWithEmailAndPassword,
    singInWithEmailAndPassword,
    updateProfile,
    singOut
}from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanUp
    //deal with memory leek
    const [cancelled, setCancelled] = useState(false);
    
    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user,{
                displayName: data.displayName
            })
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        return () => setCancelled(true)
    }, []);

    return{
        auth,
        getAuth,
        createUser,
        error,

    }
}