'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { handleCleanCookie } from '@/utils/cookies.util'
import { JwtEnumKey } from '@/common/enum/localstorage.enum'
import { getLocalStorage } from '@/utils/localstorage.util'

const NotFoundPage = () => {
    const router = useRouter()

    React.useEffect(() => {
        const jwt = getLocalStorage(JwtEnumKey.JWT)
        if (jwt) setTimeout(() => router.push("/"), 5000);
    }, [])

    return (
        <div>NotFoundPage</div>
    )
}

export default NotFoundPage