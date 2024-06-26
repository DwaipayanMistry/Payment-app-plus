import { Button } from "./button"
interface AppBarProps {
    user?: { name?: string | null },
    // TODO: Add types onSignin and onSignout
    onSignin: any,
    onSignout: any
}

export const AppBar = ({ user, onSignin, onSignout }: AppBarProps) => {
    return <div className="flex justify-between border-b px-4">
    <div className="text-lg flex flex-col justify-center">
            Paymento
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}