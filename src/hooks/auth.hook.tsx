'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { JwtEnumKey } from '@/common/enum/localstorage.enum'
import { useDispatch } from 'react-redux'
import { setAuthData } from '@/redux/reducer/auth.reducer'
import { getLocalStorage } from '@/utils/localstorage.util'
import { handleCleanCookie } from '@/utils/cookies.util'
import { Spinner } from '@material-tailwind/react'

const AuthHook = ({ children }: { children: React.ReactNode }) => {
    const [loading, setloading] = React.useState(false)
    const dispatch = useDispatch();
    const path = usePathname()
    const router = useRouter()


    React.useEffect(() => {
        setloading(true)
        const jwt = getLocalStorage(JwtEnumKey.JWT)
        const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD)

        if (!jwt) {
            handleCleanCookie(JwtEnumKey.JWT)
            return router.push("/auth/login")
        }

        if (jwt && path.includes("/auth/login")) {
            dispatch(setAuthData(currentUser))
            return router.push("/home")
        }

        () => setloading(false)
    },
        [])

    if (loading) return <>{children}</>

    return (
        <div className='flex justify-center items-center w-full h-full min-h-svh'>
            <Spinner className="h-12 w-12" />
        </div>
    )
}

export default AuthHook