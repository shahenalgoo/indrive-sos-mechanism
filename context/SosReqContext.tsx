/**
 * A context to handle sos requests
 * Also contains the useUser hook to access user data and states
 * 
 */

// React
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Appwrite
import { AppwriteIds, account, client, databases } from "@/lib/appwrite-config";
import { Models, Query } from "appwrite";
import toast from "react-hot-toast";
import { useUser } from "./SessionContext";
import { SosReq } from "@/types/typings";
import { setGlobalState } from "@/lib/global-states";


// SosReq typings
//
type SosReqContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sosReq: SosReq | null;
    setSosReq: React.Dispatch<React.SetStateAction<SosReq | null>>
};

type SosReqProviderProps = {
    children: React.ReactNode;
};


// Create new context
//
const SosReqContext = createContext<SosReqContextType | null>(null);


// Hook to access context
//
export const useSosReq = (): SosReqContextType => {
    const context = useContext(SosReqContext);

    if (!context) {
        throw new Error('Hook must be used within SosReqProvider context');
    }

    return context;
};


/**
 * SosReq Provider
 * Wrap application to provide context
 * 
 */
export const SosReqProvider: React.FC<SosReqProviderProps> = ({ children }: any) => {

    // States
    //
    const [sosReq, setSosReq] = useState<SosReq | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch User & set login status
    //
    const fetchSosReq = useCallback(async () => {

        setIsLoading(true);

        try {

            const res = await databases.listDocuments(AppwriteIds.databaseId, AppwriteIds.sosReqId, [Query.equal("is_active", true)]);

            if (res.total > 0) {
                setSosReq(res.documents[0] as SosReq);

                console.log(res.documents[0]);


                setGlobalState('sosInitiated', true)

            } else {
                console.log("No Sos Req found");
                setGlobalState('sosInitiated', false)
                setSosReq(null);
            }


        } catch (error) {

            console.log(error);

        } finally {
            setIsLoading(false);
        }

    }, []);


    // Use effect to find sos initially
    //
    useEffect(() => {
        fetchSosReq();
    }, [fetchSosReq]);




    // Use effect to subscribe to changes
    useEffect(() => {
        const subscribe = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.sosReqId}.documents`, res => {
            // Getting ref to event note
            fetchSosReq();
        });

        return () => {
            // Unsub
            subscribe();
        }
    }, []);


    // Variables made available from context
    //
    const contextValue: SosReqContextType = {
        isLoading,
        setIsLoading,
        sosReq,
        setSosReq
    };


    return (
        <SosReqContext.Provider value={contextValue}>
            {children}
        </SosReqContext.Provider>
    )
}