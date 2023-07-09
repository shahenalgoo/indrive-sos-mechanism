'use client';

// React
import { FC } from "react";
import { redirect } from "next/navigation";

// Hooks
import { useUser } from "@/context/SessionContext";

// Appwrite
import { account } from "@/lib/appwrite-config";




interface CheckUserProps {
    children: React.ReactNode;
}

const CheckUser: FC<CheckUserProps> = ({ children }) => {

    // Hooks
    //
    const { isLoading, isLoggedIn, user } = useUser();


    // If user is not logged in
    //
    if (!isLoading && !isLoggedIn) {
        redirect('/');
    }


    // If user is not an agent
    //
    if (!isLoading && isLoggedIn) {
        if (user?.email === 'agent1@indrive.com') {
            account.deleteSession('current');
            redirect('/');
        }
    }

    return (
        <>
            {children}
        </>
    )
}

export default CheckUser;