'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { JwtEnumKey } from '@/common/enum/localstorage.enum'
import { useDispatch } from 'react-redux'
import { setAuthData } from '@/redux/reducer/auth.reducer'
import { getLocalStorage } from '@/utils/localstorage.util'
import { handleCleanCookie } from '@/utils/cookies.util'

const AuthHook = () => {
    const dispatch = useDispatch();
    const path = usePathname()
    const router = useRouter()


    React.useEffect(() => {
        const jwt = getLocalStorage(JwtEnumKey.JWT)
        const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD)

        if (!jwt) {
            handleCleanCookie(JwtEnumKey.JWT)
            router.push("/auth/login")
        }

        if (jwt && path.includes("/auth/login")) {
            dispatch(setAuthData(currentUser))
            router.push("/home")
        }
    }, [path])

    return <></>
}

export default AuthHook