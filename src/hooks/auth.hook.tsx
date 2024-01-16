'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const AuthHook = () => {
    const router = useRouter()
    const pathname = usePathname()


    React.useEffect(() => {
        const jwt = localStorage.getItem("jwt")

        if (!pathname || pathname === "/") {
            router.push('/home')
        }

        if (!jwt) {
            localStorage.clear();
            router.push("/auth/login")
        }

    }, [])


    return <></>
}

export default AuthHook