
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Suspense } from "react"

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}
