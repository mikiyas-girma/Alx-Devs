import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Suspense } from "react"

export default function Layout() {
    const location = useLocation();
    const showHeader = !['/login', '/signup', '/'].includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            {/* <Footer /> */}
        </>
    )
}
