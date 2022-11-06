import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import './assets/fonts/fonts.css'

// Private Routes
// import UserRotues from "./components/privateRoutes/UserRoutes"

// pages imports
// import { DataProvider } from "./contexts/Database"
import Logo from "./components/loadingAnimaitno/Logo"
import Settings from "./pages/settings/Settings"
import Workshop from "./pages/workhshops/Workshop"
import Profile from "./pages/profile/Profile"
import AccSettings from "./pages/accSettings/AccSettings"
import UserRotues from "./privateRoutes/UserRoutes"
const Login = React.lazy(() => import('./auth/Login'))
const Signup = React.lazy(() => import('./auth/Signup'))
const Home = React.lazy(() => import("./pages/home/Home"))
const MyOrders = React.lazy(() => import("./pages/myOrders/MyOrders"))
const EditProfile = React.lazy(() => import("./pages/editprofile/EditProfile"))
const Menu = React.lazy(() => import("./pages/menu/Menu"))
const Event = React.lazy(() => import('./pages/events/Evets'))
const Tikets = React.lazy(() => import("./pages/tikets/Tikets"))
const Page404 = React.lazy(() => import("./components/404/Page404"))


const AllRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route exact path='/' element={<Suspense fallback={<Logo />}>
                <Home />
            </Suspense>} />
            <Route path='*' element={<Suspense fallback={<Logo />}>
                <Page404 />
            </Suspense>} /> 
            <Route path='/signup' element={<Suspense fallback={<Logo />}>
                <Signup />
            </Suspense>} />
            <Route path='/login' element={<Suspense fallback={<Logo />}>
                <Login />
            </Suspense>} />
            <Route path='/menu' element={<Suspense fallback={<Logo />}>
                <Menu />
            </Suspense>} />
            <Route path='/tikets' element={<Suspense fallback={<Logo />}>
                <Tikets />
            </Suspense>} />
            <Route path="/workshops" element={<Workshop />} />
            <Route path="/settings/reset-password" element={
                <AccSettings />
            } />

            {/* user Routes */}
            <Route element={<UserRotues />}>
                <Route path="/profile" element={
                    <Profile />
                } />
                <Route path="/profile/orders" element={
                    <MyOrders />
                } />

                <Route path="/events" element={
                    <Event />
                } />
                <Route path="/edit-profile" element={
                    <EditProfile />
                } />
                <Route path="/settings" element={
                    <Settings />
                } />
            </Route>
        </Routes>
    )
}
export default AllRoutes