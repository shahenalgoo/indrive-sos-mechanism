'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC, useEffect, useRef } from "react";

import Box from "@/components/ui/box";
import { TbChecks, TbCircle, TbCircleCheck, TbCircleX, TbLoader2, TbSquareRounded, TbSquareRoundedCheckFilled } from "react-icons/tb";
import { useClientSos } from "@/context/ClientSosContext";
import { Button } from "@/components/ui/button";
import { AppwriteIds, databases } from "@/lib/appwrite-config";
import { SosReq } from "@/types/typings";
import { cn } from "@/lib/override-classes";
import toast from "react-hot-toast";


/**
 * SOS Procedure
 * 
 */
const SosProcedureStarted: FC = () => {
    return (
        <Box space='sm' className="text-sm text-secondary font-semibold flex items-center gap-2">
            <TbChecks size={20} strokeWidth={2} />
            <span>SOS SENT</span>
            <span className="text-xs font-normal text-neutral-400">with all necessary information</span>
        </Box>
    )
}


/**
 * SOS Acknowledgement
 * 
 */
const SosAcknowledgement: FC = () => {

    // Hooks
    //
    const { sosReq } = useClientSos();

    return (
        <div >
            test
        </div>
        // <Box space='sm'>
        //     {sosReq?.req_acknowledged === false &&
        //         <div className="text-sm text-orange-300 font-medium flex items-center gap-2">
        //             <TbLoader2 size={20} strokeWidth={2} className="animate-spin" />
        //             <span>Awaiting response...</span>
        //         </div>
        //     }

        //     {sosReq?.req_acknowledged === true &&
        //         <div className="text-sm text-secondary font-semibold flex items-center gap-2">
        //             <TbChecks size={20} strokeWidth={2} />
        //             <span>SOS ACKNOWLEDGED</span>
        //             <span className="text-xs font-normal text-neutral-400">by safety agent</span>
        //         </div>
        //     }
        // </Box>
    )
}



/**
 * SOS CALLBACK
 * 
 */
const SosCallback: FC = () => {

    // Hooks
    //
    const { sosReq } = useClientSos();

    const handleCannotSpeak = async () => {
        if (!sosReq) {
            console.log("SOS REQUEST NOT FOUND");
            return;
        }
        try {
            await databases.updateDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, sosReq.$id, { can_speak: !sosReq.can_speak } as SosReq)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box className="p-0">
            <div className="px-3 pt-3">
                <p className="mb-3 text-sm">A safety agent will call you on the phone number associated to this account.</p>
                <p className="mb-2 text-xs text-neutral-400">If you are unable to speak, tap below and the agent will only chat with you.</p>
            </div>

            <div className="py-2 px-3 border-t border-neutral-700">
                {sosReq?.can_speak === true &&
                    <Button onClick={handleCannotSpeak} variant='ghost' className="pl-2 hover:bg-transparent text-rose-400 hover:text-rose-400">
                        <TbSquareRounded size={24} strokeWidth={1.5} className="mr-2" />
                        I am unable to speak
                    </Button>
                }

                {sosReq?.can_speak === false &&
                    <Button onClick={handleCannotSpeak} variant='ghost' className="pl-2 hover:bg-transparent text-lime-400 hover:text-lime-400">
                        <TbSquareRoundedCheckFilled size={24} strokeWidth={1.5} className="mr-2" />
                        I am unable to speak
                    </Button>
                }
            </div>
        </Box>
    )
}



/**
 * CHAT MESSAGES
 * 
 */
const AllMessages: FC = () => {

    // Hooks
    //
    const { allMessages } = useClientSos();
    const messagesEndRef = useRef<null | HTMLDivElement>(null);


    // Auto Scroll to bottom
    //
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [allMessages]);

    return (
        <div className="mt-4 flex gap-3 flex-col-reverse">
            <div ref={messagesEndRef} />

            {allMessages?.map((message) => (
                <div key={message.$id} id={message.$id} className="message">
                    <div className={cn('flex items-end', {
                        'justify-end': message.role === 'client'
                    })}>

                        <div className={cn('flex flex-col space-y-2 text-sm max-w-[16rem] overflow-x-hidden', {
                            'order-1 items-end': message.role === 'client',
                            'order-2 items-start': message.role !== 'client',
                        })}>
                            <p className={cn(`px-4 py-2 rounded-xl whitespace-pre-line`, {
                                'bg-neutral-200 text-sm font-medium': message.role === 'client',
                                'bg-lime-300 text-md font-semibold': message.role !== 'client',
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



/**
 * MAIN EXPORT
 * 
 */
const ChatMessages: FC = () => {

    return (
        <div className="chat-messages relative z-40 w-full h-full pt-12 pb-20 pr-0">
            <SosAcknowledgement />

            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-4">

                    <SosProcedureStarted />
                    <SosCallback />
                    <AllMessages />

                </div>
            </ScrollArea>
        </div>
    )
}

export default ChatMessages;