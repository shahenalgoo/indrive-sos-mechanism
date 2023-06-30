'use client';

import { FC } from "react";

import { useUser } from "@/context/SessionContext";


const ClientLogin: FC = () => {

    // Hooks
    //
    const { anonLogin: handleAnonLogin, logout: handleLogout } = useUser();



    return (
        <>
            <button onClick={handleAnonLogin}>Anon login</button>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default ClientLogin;