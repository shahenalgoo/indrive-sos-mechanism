/**
 * A context to handle sos requests
 * 
 */

// React
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Appwrite
import { AppwriteIds, client, databases } from "@/lib/appwrite-config";
import { Query } from "appwrite";
import { SosReq } from "@/types/typings";
import { setGlobalState } from "@/lib/global-states";


// SosReq typings
//
type SosRequestsContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sosReqs: SosReq[] | null;
    setSosReqs: React.Dispatch<React.SetStateAction<SosReq[] | null>>
};

type SosRequestsProviderProps = {
    children: React.ReactNode;
};


// Create new context
//
const SosReqContext = createContext<SosRequestsContextType | null>(null);


// Hook to access context
//
export const useSosRequests = (): SosRequestsContextType => {
    const context = useContext(SosReqContext);

    if (!context) {
        throw new Error('Hook must be used within SosReqProvider context');
    }

    return context;
};


/**
 * Sos Requests Provider
 * Wrap application to provide context
 * 
 */
export const SosRequestsProvider: React.FC<SosRequestsProviderProps> = ({ children }: any) => {

    // States
    //
    const [sosReqs, setSosReqs] = useState<SosReq[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch SOS Requests
    //
    const fetchSosRequests = useCallback(async () => {

        setIsLoading(true);

        try {

            const res = await databases.listDocuments(AppwriteIds.databaseId, AppwriteIds.sosReqId,
                [
                    Query.equal("is_active", true),
                    Query.orderDesc("$createdAt")
                ]
            );

            if (res.total > 0) {

                setSosReqs(res.documents as SosReq[]);
                setGlobalState('sosInitiated', true)

            } else {
                console.log("No Sos Req found");
                setGlobalState('sosInitiated', false)
                setSosReqs(null);
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
        fetchSosRequests();
    }, [fetchSosRequests]);




    // Use effect to subscribe to changes
    useEffect(() => {
        const subscribe = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.sosReqId}.documents`, res => {
            // Getting ref to event note
            fetchSosRequests();
        });

        return () => {
            // Unsub
            subscribe();
        }
    }, []);


    // Variables made available from context
    //
    const contextValue: SosRequestsContextType = {
        isLoading,
        setIsLoading,
        sosReqs,
        setSosReqs
    };


    return (
        <SosReqContext.Provider value={contextValue}>
            {children}
        </SosReqContext.Provider>
    )
}