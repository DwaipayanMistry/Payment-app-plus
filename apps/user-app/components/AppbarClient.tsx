"use client"

import { AppBar } from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export function AppbarClient() {
    const session = useSession();
    const router = useRouter();
    return (
        <div>
            <AppBar onSignin={signIn} onSignout={async () => {
                await signOut()
                router.push("/api/auth/signin")
            }} user={session.data?.user}></AppBar>
        </div>
    )
}