/**
 * A context to handle sos requests
 * 
 */

// React
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Tyings
import { SosReq } from "@/types/typings";

// Appwrite
import { AppwriteIds, client, databases } from "@/lib/appwrite-config";
import { Query } from "appwrite";

// Lib
import { setGlobalState } from "@/lib/global-states";
import { useUser } from "./SessionContext";


// SosReq typings
//
type AgentSosContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    allRequests: SosReq[] | null;
    updateSos: (sosRequest: SosReq | null, data: any) => Promise<void>
};

type AgentSosProviderProps = {
    children: React.ReactNode;
};


// Create new context
//
const AgentSosContext = createContext<AgentSosContextType | null>(null);


// Hook to access context
//
export const useAgentSos = (): AgentSosContextType => {
    const context = useContext(AgentSosContext);

    if (!context) {
        throw new Error('Hook must be used within SosReqProvider context');
    }

    return context;
};


// Sos Requests Provider
//
export const AgentSosProvider: React.FC<AgentSosProviderProps> = ({ children }: any) => {

    // States
    //
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allRequests, setAllReqests] = useState<SosReq[] | null>(null);

    const { user } = useUser();


    //Fetch all SOS requests
    //
    const fetchAllRequests = useCallback(async () => {
        if (!user) {
            console.log("Cannot fetch sos requests, user not found");
            return;
        }

        setIsLoading(true);

        try {
            const res = await databases.listDocuments(AppwriteIds.databaseId, AppwriteIds.sosReqId,
                [
                    Query.equal("is_active", true),
                    Query.orderDesc("$createdAt")
                ]
            )

            if (res.total > 0) {
                setAllReqests(res.documents as SosReq[]);
                setGlobalState('sosInitiated', true)
            } else {
                // console.log("No SOS request found.");
                setGlobalState('sosInitiated', false)
                setAllReqests(null);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }, [user]);


    // Update SOS
    //
    const updateSos = async (sosRequest: SosReq | null, data: any) => {
        if (!sosRequest) {
            console.log("SOS REQUEST NOT FOUND");
            return;
        }

        try {
            await databases.updateDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, sosRequest.$id, data)
        } catch (error) {
            console.log(error);
        }
    }


    // UEF - Fetch SOS requests, Subscribe to changes
    //
    useEffect(() => {
        fetchAllRequests();

        // Sub to all documents
        const subscribe = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.sosReqId}.documents`, res => {
            fetchAllRequests();
        });

        return () => {
            // Unsub
            subscribe();
        }
    }, [fetchAllRequests]);


    // Variables made available from context
    //
    const contextValue: AgentSosContextType = {
        isLoading,
        setIsLoading,
        allRequests,
        updateSos
    }

    return (
        <AgentSosContext.Provider value={contextValue}>
            {children}
        </AgentSosContext.Provider>
    )
};