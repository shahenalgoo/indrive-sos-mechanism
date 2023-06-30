'use client';

import { FC } from "react";
import { redirect } from "next/navigation";

import { useUser } from "@/context/SessionContext";
import { account } from "@/lib/appwrite-config";

interface CheckUserProps {
    children: React.ReactNode;
}

const CheckUser: FC<CheckUserProps> = ({ children }) => {

    // Hooks
    //
    const { isLoading, isLoggedIn, user } = useUser();


    // If user is not logged in
    if (!isLoading && !isLoggedIn) {
        redirect('/agent/');
    }


    // If user is not an agent
    if (!isLoading && isLoggedIn) {
        if (user?.email !== 'agent1@indrive.com') {
            account.deleteSession('current');
            redirect('/agent/');
        }
    }

    return (
        <>
            {children}
        </>
    )
}

export default CheckUser;