/**
 * A context to handle client sos request
 * 
 */

// React
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Appwrite
import { AppwriteIds, client, databases } from "@/lib/appwrite-config";
import { ID, Query } from "appwrite";

// Hooks
import { useUser } from "./SessionContext";

//Lib
import { setGlobalState } from "@/lib/global-states";

// Typings & Enums
import { SosMessage, SosReq } from "@/types/typings";
import { Role } from "@/types/enums";


// SosReq typings
//
type ClientSosContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sosReq: SosReq | null;
    setSosReq: React.Dispatch<React.SetStateAction<SosReq | null>>;
    allMessages: SosMessage[];
    sendMessage: (userId: string, message: string) => Promise<void>;
    updateSos: (sosRequest: SosReq | null, data: any) => Promise<void>
};

type ClientSosProviderProps = {
    children: React.ReactNode;
};


// Create new context
//
const ClientSosContext = createContext<ClientSosContextType | null>(null);


// Hook to access context
//
export const useClientSos = (): ClientSosContextType => {
    const context = useContext(ClientSosContext);

    if (!context) {
        throw new Error('Hook must be used within ClientSosProvider context');
    }

    return context;
};


/**
 * SosReq Provider
 * Wrap application to provide context
 * 
 */
export const ClientSosProvider: React.FC<ClientSosProviderProps> = ({ children }: any) => {

    // States
    //
    const [sosReq, setSosReq] = useState<SosReq | null>(null);
    const [allMessages, setAllMessages] = useState<SosMessage[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    // Hooks
    //
    const { isLoggedIn, user } = useUser();


    // Fetch user's sos req
    //
    const fetchSosReq = useCallback(async () => {
        if (!user) {
            console.log("Cannot fetch messages, user not found");
            return;
        }

        setIsLoading(true);

        try {

            const res = await databases.listDocuments(AppwriteIds.databaseId, AppwriteIds.sosReqId,
                [
                    Query.equal("is_active", true),
                    Query.equal("initiator", user.$id),
                ]
            );

            if (res.total > 0) {
                setSosReq(res.documents[0] as SosReq);
                setGlobalState('sosInitiated', true)
            } else {
                setGlobalState('sosInitiated', false)
                setSosReq(null);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }, [user]);


    // Fetch messages for SOS request
    //
    const fetchMessages = useCallback(async () => {
        if (!sosReq) {
            console.log("Cannot fetch messages, SOS req not found");
            return;
        }

        try {

            const res = await databases.listDocuments(AppwriteIds.databaseId, AppwriteIds.messagesId,
                [
                    Query.equal("sos_related", sosReq.$id),
                    Query.orderDesc("$createdAt")
                ]
            );

            if (res.total > 0) {
                setAllMessages(res.documents as SosMessage[]);
            } else {
                console.log("No Messages found");
            }

        } catch (error) {
            console.log(error);
        }

    }, [sosReq, isLoggedIn]);


    // Client sends message
    //
    const sendMessage = async (userId: string, message: string) => {
        if (!sosReq) {
            console.log("SOS REQUEST NOT FOUND");
            return;
        }

        try {
            const res = await databases.createDocument(AppwriteIds.databaseId, AppwriteIds.messagesId, ID.unique(), {
                sos_related: sosReq.$id,
                sender: userId,
                role: Role.client,
                message: message
            } as SosMessage)

        } catch (error) {
            console.log(error);
        }
    }


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


    // UEF - Fetch sos messages and subscribe to changes
    useEffect(() => {
        fetchMessages();

        const subscribeSosMessages = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.messagesId}.documents`, res => {
            const eventMessage: SosMessage = res.payload as SosMessage;
            if (eventMessage.sos_related === sosReq?.$id) {
                fetchMessages();
            }
        });
        return () => {
            // Unsubscribe on unmount
            subscribeSosMessages();
        }
    }, [fetchMessages]);


    // Use effect for initial fetch and also subscribe to changes
    useEffect(() => {
        fetchSosReq();
        const subscribe = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.sosReqId}.documents`, res => {
            // Getting ref to event note
            fetchSosReq();
        });

        return () => {
            // Unsub
            subscribe();
        }
    }, [fetchSosReq]);


    // Variables made available from context
    //
    const contextValue: ClientSosContextType = {
        isLoading,
        setIsLoading,
        sosReq,
        setSosReq,
        allMessages: allMessages as SosMessage[],
        sendMessage,
        updateSos
    };


    return (
        <ClientSosContext.Provider value={contextValue}>
            {children}
        </ClientSosContext.Provider>
    )
}