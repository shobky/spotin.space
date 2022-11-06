import React, { Suspense } from "react";
import ReactDOM from "react-dom/client"
import './Global.css'
import Logo from "./components/loadingAnimaitno/Logo";
import './assets/fonts/fonts.css'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
const AllRoutes = React.lazy(() => import('./Routes'))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense fallback={
            <Logo />
        }>
            <BrowserRouter>
                <AuthProvider>
                    <AllRoutes />
                </AuthProvider>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>
)