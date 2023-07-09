'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { AppwriteIds, client, databases } from "@/lib/appwrite-config";
import { SosMessage, SosReq } from "@/types/typings";
import { cn } from "@/lib/override-classes";
import { Query } from "appwrite";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


/**
 * CHAT MESSAGES
 * 
 */

interface AllMessagesProps {
    id: string;
}

const AllMessages: FC<AllMessagesProps> = ({ id }) => {

    // Hooks
    //
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sosMessages, setSosMessages] = useState<SosMessage[] | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);


    // FETCH SOS MESSAGES
    //
    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await databases.listDocuments(AppwriteIds.databaseId, AppwriteIds.messagesId,
                [
                    Query.equal("sos_related", id),
                    Query.orderDesc("$createdAt")
                ]
            );

            if (res.total > 0) {
                setSosMessages(res.documents as SosMessage[]);
                // console.log("all messages", res.documents);
            } else {
                console.log("No Messages found");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchMessages();

        const subscribe = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.messagesId}.documents`, res => {
            const eventMessage: SosMessage = res.payload as SosMessage;
            if (eventMessage.sos_related === id) {
                fetchMessages();
            }
        });
        return () => {
            subscribe();
        }
    }, [fetchMessages]);



    // TODAY
    // const timeNow = new Date();
    // // const timeNow = Date.now();

    // // DATE & TIME
    // const dateOptions = { month: 'short', day: 'numeric' };
    // const timeOptions = { hour: '2-digit', minute: '2-digit' };

    // // ENTRY DEADLINE
    // const parsedDeadline = new Date(data.entryDeadline);
    // const deadlineDate = parsedDeadline.toLocaleDateString('en-US', dateOptions);
    // const deadlineTime = parsedDeadline.toLocaleTimeString('en-US', timeOptions);

    // // STARTING
    // const parsedStarting = new Date(data.startingDate);
    // const startingDate = parsedStarting.toLocaleDateString('en-US', dateOptions);
    // const startingTime = parsedStarting.toLocaleTimeString('en-US', timeOptions);

    // // ENDING
    // const parsedEnding = new Date(data.endingDate);
    // const endingDate = parsedEnding.toLocaleDateString('en-US', dateOptions);
    // const endingTime = parsedEnding.toLocaleTimeString('en-US', timeOptions);



    const getTime = (dateString: string) => {
        console.log(new Date(dateString));

        // return new Date(dateString);
        return ""
    }



    // Auto Scroll to bottom
    //
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [sosMessages]);



    return (
        <div className="flex gap-3 flex-col-reverse">
            <div ref={messagesEndRef} />

            {sosMessages?.map((message) => (
                <div key={message.$id} id={message.$id} className="message ">
                    <div className={cn('flex items-end', {
                        'justify-end': message.role === 'agent'
                    })}>

                        <div className={cn('flex items-center justify-center gap-2 text-sm max-w-[20rem] overflow-x-hidden', {
                            // 'order-1 items-end': message.role === 'agent',
                            // 'order-2 items-start': message.role !== 'agent',
                        })}>

                            {message.role === 'client' &&
                                <Avatar className="w-6 h-6">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            }

                            <p className={cn(`px-4 py-2 rounded-xl whitespace-pre-line text-md text-black font-semibold`, {
                                'bg-neutral-200': message.role === 'agent',
                                'bg-rose-200': message.role !== 'agent',
                            })}>
                                {message.message}
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}






interface ChatMessagesProps {
    id: string;
    sosRequest: SosReq | null
}

const ChatMessages: FC<ChatMessagesProps> = ({ id, sosRequest }) => {

    return (
        <div className="relative z-40 w-full h-full pb-20 pr-0">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-3 p-4">

                    <AllMessages id={id} />

                </div>
            </ScrollArea>
        </div>
    )
}

export default ChatMessages;