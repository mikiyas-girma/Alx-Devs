import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/toaster"


export default function Layout() {
    const location = useLocation();
    const showHeader = !['/login', '/signup', '/'].includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}
            <main>
                <Suspense fallback={
                    <div className="flex flex-col gap-4 p-4">
                        <Skeleton className="h-12" />
                        <Skeleton className="h-12" />
                        <Skeleton className="h-12" />
                        <Skeleton className="h-12" />
                    </div>
                }>
                    <Outlet />
                </Suspense>
            <Toaster />
            </main>
            {/* <Footer /> */}
        </>
    )
}
