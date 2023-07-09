/**
 * A context to handle user sessions from appwrite
 * 
 */

// React
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Appwrite
import { account } from "@/lib/appwrite-config";
import { Models } from "appwrite";

// Lib
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

// Typings
import { UserPref } from "@/types/typings";
import { Mood } from "@/types/enums";



// Session typings
//
type SessionContextType = {
    //Session
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: Models.User<Models.Preferences> | null;
    setUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | null>>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;

    // User Preferences
    prefs: UserPref;
    setPrefs: React.Dispatch<React.SetStateAction<UserPref>>;
    updatePrefs: (newPrefs: UserPref) => Promise<void>
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

    const [prefs, setPrefs] = useState<UserPref>(
        {
            moodprefs: {
                mood: Mood.neutral,
                min_talk: false,
                no_music: false,
                no_smoking: false,
            },
            safety_badge: false
        }
    )

    const router = useRouter();


    // Fetch user & set login status
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

        } catch (error) {

            // Set user data to null on error
            setUser(null);
            toast.error("Log in to continue");
            console.log(error);

        } finally {
            setIsLoading(false);
        }

    }, []);


    // Login using Appwrite
    //
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        toast.loading("Logging in...");
        try {

            const login = await account.createEmailSession(email, password);

            const userData = await account.get();
            setUser(userData);
            setIsLoggedIn(true);

            toast.dismiss();
            toast.success("Login Successful");

            router.push('/ride');

        } catch (error) {
            // Set user data to null on error
            setUser(null);
            console.log(error);

            toast.dismiss();
            toast.error("Login Failed");

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


    // Get user preferences from appwrite
    //
    const getPrefs = useCallback(async () => {

        try {
            const res: UserPref = await account.getPrefs();

            // Set prefs only if found
            if (JSON.stringify(res) !== "{}") {
                setPrefs(res);
            }

        } catch (error) {
            console.log(error);
        }

    }, []);


    // Set user mood & preferences
    //
    const updatePrefs = async (newPrefs: UserPref) => {
        try {
            const res = await account.updatePrefs(newPrefs);
            setPrefs(newPrefs);
        } catch (error) {
            console.log(error);
        }
    }


    // Use effect
    //
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);


    // UEF - Get prefs on init
    useEffect(() => {
        if (isLoggedIn) {
            getPrefs();
        }
    }, [isLoggedIn]);


    // Variables made available from context
    //
    const contextValue: SessionContextType = {
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        login,
        logout,
        prefs,
        setPrefs,
        updatePrefs
    };


    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    )
}