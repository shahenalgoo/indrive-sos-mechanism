'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/SessionContext";
import { redirect, useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "react-hot-toast";


const Logout: FC = () => {

    const { logout } = useUser();
    const router = useRouter();

    const onLogout = async () => {
        logout();
        router.push('/')
        // toast.success("You've been logged out.")
    }

    return (
        <Button onClick={onLogout} variant='ghost'>
            Logout
        </Button>
    );
}

export default Logout;