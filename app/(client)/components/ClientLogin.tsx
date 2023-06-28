'use client';

import { FC, useEffect } from "react";

import { useUser } from "@/context/SessionContext";
import { account } from "@/lib/appwrite-config";
import toast from "react-hot-toast";


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