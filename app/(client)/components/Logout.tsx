'use client';

// React
import { FC } from "react";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";

// Hooks
import { useUser } from "@/context/SessionContext";




const Logout: FC = () => {

    // Hooks
    //
    const { logout } = useUser();
    const router = useRouter();

    // Logout
    //
    const onLogout = async () => {
        logout();
        router.push('/')
    }

    return (
        <Button onClick={onLogout} variant='ghost'>
            Logout
        </Button>
    )
}

export default Logout;