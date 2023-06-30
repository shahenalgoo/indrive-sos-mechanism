/**
 * A context to handle sos requests
 * Also contains the useUser hook to access user data and states
 * 
 */

// React
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Appwrite
import { AppwriteIds, account, client, databases } from "@/lib/appwrite-config";
import { ID, Models, Query } from "appwrite";
import toast from "react-hot-toast";
import { useUser } from "./SessionContext";
import { SosMessage, SosReq } from "@/types/typings";
import { setGlobalState } from "@/lib/global-states";
import { Role } from "@/types/enums";


// SosReq typings
//
type ClientSosContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sosReq: SosReq | null;
    setSosReq: React.Dispatch<React.SetStateAction<SosReq | null>>;
    allMessages: SosMessage[];
    sendMessage: (userId: string, message: string) => Promise<void>
};

type ClientSosProviderProps = {
    children: React.ReactNode;
};


// Create new context
//
const ClientSosContext = createContext<ClientSosContextType | null>(null);


// Hook to access context
//
export const useSosReq = (): ClientSosContextType => {
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
                console.log("all messages", res.documents);

            } else {
                console.log("No Messages found");
            }


        } catch (error) {

            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }, [sosReq]);


    // Agent sends message to client
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

    // UEF - SOS req messages
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
        sendMessage
    };


    return (
        <ClientSosContext.Provider value={contextValue}>
            {children}
        </ClientSosContext.Provider>
    )
}