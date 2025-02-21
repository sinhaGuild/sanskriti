"use client"
import { SignIn } from '@clerk/nextjs';

import AuthComponent from '@/components/AuthComponent';

export default function Page() {
    return (
        <AuthComponent>
            {<SignIn />}
        </AuthComponent>
    )
}