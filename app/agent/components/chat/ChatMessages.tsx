'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import Box from "@/components/ui/box";
import { TbChecks, TbCircleCheck, TbCircleX, TbLoader2 } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { AppwriteIds, client, databases } from "@/lib/appwrite-config";
import { SosMessage, SosReq } from "@/types/typings";
import { cn } from "@/lib/override-classes";
import { Query } from "appwrite";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface ChatMessagesProps {
    id: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({ id }) => {

    return (
        <div className="relative z-40 w-full h-full pb-20 pr-0">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-4">

                    {/* <SosProcedureStarted /> */}
                    {/* <SosAcknowledgement /> */}
                    {/* <SosCallback /> */}
                    <AllMessages id={id} />

                </div>
            </ScrollArea>
        </div>
    )
}

export default ChatMessages;




/**
 * SOS Procedure
 * 
 */
// const SosProcedureStarted: FC = () => {
//     return (
//         <Box space='sm' className="text-sm text-secondary font-semibold flex items-center gap-2">
//             <TbChecks size={20} strokeWidth={2} />
//             <span>SOS SENT</span>
//             <span className="text-xs font-normal text-neutral-400">with all necessary information</span>
//         </Box>
//     )
// }


/**
 * SOS Acknowledgement
 * 
 */
// const SosAcknowledgement: FC = () => {

//     // Hooks
//     //
//     const { sosReq } = useClientSos();

//     return (
//         <Box space='sm'>
//             {sosReq?.req_acknowledged === false &&
//                 <div className="text-sm text-orange-300 font-medium flex items-center gap-2">
//                     <TbLoader2 size={20} strokeWidth={2} className="animate-spin" />
//                     <span>Awaiting response...</span>
//                 </div>
//             }
//             {sosReq?.req_acknowledged === true &&
//                 <div className="text-sm text-secondary font-semibold flex items-center gap-2">
//                     <TbChecks size={20} strokeWidth={2} />
//                     <span>SOS ACKNOWLEDGED</span>
//                     <span className="text-xs font-normal text-neutral-400">by safety agent</span>
//                 </div>
//             }
//         </Box>
//     )
// }



/**
 * SOS CALLBACK
 * 
 */
// const SosCallback: FC = () => {

//     // Hooks
//     //
//     const { sosReq } = useClientSos();

//     const handleCannotSpeak = async () => {
//         if (!sosReq) {
//             console.log("SOS REQUEST NOT FOUND");
//             return;
//         }
//         try {
//             await databases.updateDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, sosReq.$id, { can_speak: !sosReq.can_speak } as SosReq)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <Box className="text-sm">
//             <p className="mb-4">A safety agent will call you on the number associated to this account.</p>
//             <p className="mb-2 text-neutral-400">Tap below if you {sosReq?.can_speak ? 'cannot' : 'can'} speak:</p>

//             {sosReq?.can_speak === true &&
//                 <Button onClick={handleCannotSpeak} variant='accent' className="pl-2">
//                     <TbCircleCheck size={24} strokeWidth={1.5} className="mr-2" />
//                     I am able to speak
//                 </Button>
//             }

//             {sosReq?.can_speak === false &&
//                 <Button onClick={handleCannotSpeak} variant='destructive' className="pl-2">
//                     <TbCircleX size={24} strokeWidth={1.2} className="mr-2" />
//                     I am unable to speak
//                 </Button>
//             }
//         </Box>
//     )
// }



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