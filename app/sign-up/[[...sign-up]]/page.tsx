import AuthComponent from '@/components/AuthComponent'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <AuthComponent>
            {<SignUp />}
        </AuthComponent>
    )
}