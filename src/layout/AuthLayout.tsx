import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

function AuthLayout() {
    return (
        <>
            <div className="bg-(--color-violeta-background) min-h-screen">
                <div className="max-w-screen-lg mx-auto pt-10 px-5">

                    <div className="py-10 text-center">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Toaster position="top-right" />
        </>
    )
}

export default AuthLayout