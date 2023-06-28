/**
 * A context to handle user sessions from appwrite
 * Also contains the useUser hook to access user data and states
 * 
 */

// React
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Appwrite
import { account } from "@/lib/appwrite-config";
import { Models } from "appwrite";
import toast from "react-hot-toast";


// Session typings
//
type SessionContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: Models.User<Models.Preferences> | null;
    setUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | null>>;
    anonLogin: () => Promise<void>;
    logout: () => Promise<void>
};

type SessionProviderProps = {
    children: React.ReactNode;
};


// Create new context
//
const SessionContext = createContext<SessionContextType | null>(null);


// Hook to access context
//
export const useUser = (): SessionContextType => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('Hook must be used within SessionProvider context');
    }

    return context;
};


/**
 * Session Provider
 * Wrap application to provide context
 * 
 */
export const SessionProvider: React.FC<SessionProviderProps> = ({ children }: any) => {

    // States
    //
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    // Fetch User & set login status
    //
    const fetchUser = useCallback(async () => {

        setIsLoading(true);

        try {

            // Get & set user active session
            const activeSession = await account.getSession('current');
            if (!activeSession) return;
            setIsLoggedIn(true);

            // Get & set user data
            const userData = await account.get();
            setUser(userData);
            console.log(userData);


        } catch (error) {

            // Set user data to null on error
            setUser(null);
            console.log("PLEASE LOG IN TO CONTINUE.");
            console.log(error);

        } finally {
            setIsLoading(false);
        }

    }, []);


    // Anon Login using Appwrite for CLIENT
    //
    const anonLogin = async () => {
        setIsLoading(true);

        try {

            const login = await account.createAnonymousSession();

            // Get & set user data
            const userData = await account.get();
            setUser(userData);
            setIsLoggedIn(true);
            console.log(userData);


        } catch (error) {
            // Set user data to null on error
            setUser(null);
            console.log("LOG IN ATEMPT FAILED.");
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }

    // Logout 
    //
    const logout = async () => {

        setIsLoading(true);
        toast.loading('Logging out...');

        try {
            await account.deleteSession('current');
            setIsLoggedIn(false);
            setUser(null);
            toast.dismiss();
            toast.success('You logged out!');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    // Use effect
    //
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);


    // Variables made available from context
    //
    const contextValue: SessionContextType = {
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        anonLogin,
        logout
    };


    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    )
}