import { Outlet, Navigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { FireSotreProvider } from "../contexts/FireStoreContext"

const UserRotues = () => {
    const { user } = useAuth()
    return (
        user?.uid ?
            <FireSotreProvider>
                <Outlet />
            </FireSotreProvider> : <Navigate to='/login' />
    )
}

export default UserRotues