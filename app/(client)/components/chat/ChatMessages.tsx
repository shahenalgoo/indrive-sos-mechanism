'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC, useEffect, useRef } from "react";

import Box from "@/components/ui/box";
import { TbChecks, TbCircleCheck, TbCircleX, TbLoader2 } from "react-icons/tb";
import { useClientSos } from "@/context/ClientSosContext";
import { Button } from "@/components/ui/button";
import { AppwriteIds, databases } from "@/lib/appwrite-config";
import { SosReq } from "@/types/typings";
import { cn } from "@/lib/override-classes";


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
        <Box space='sm'>
            {sosReq?.req_acknowledged === false &&
                <div className="text-sm text-orange-300 font-medium flex items-center gap-2">
                    <TbLoader2 size={20} strokeWidth={2} className="animate-spin" />
                    <span>Awaiting response...</span>
                </div>
            }
            {sosReq?.req_acknowledged === true &&
                <div className="text-sm text-secondary font-semibold flex items-center gap-2">
                    <TbChecks size={20} strokeWidth={2} />
                    <span>SOS ACKNOWLEDGED</span>
                    <span className="text-xs font-normal text-neutral-400">by safety agent</span>
                </div>
            }
        </Box>
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
        <Box className="text-sm">
            <p className="mb-4">A safety agent will call you on the number associated to this account.</p>
            <p className="mb-2 text-neutral-400">Tap below if you {sosReq?.can_speak ? 'cannot' : 'can'} speak:</p>

            {sosReq?.can_speak === true &&
                <Button onClick={handleCannotSpeak} variant='accent' className="pl-2">
                    <TbCircleCheck size={24} strokeWidth={1.5} className="mr-2" />
                    I am able to speak
                </Button>
            }

            {sosReq?.can_speak === false &&
                <Button onClick={handleCannotSpeak} variant='destructive' className="pl-2">
                    <TbCircleX size={24} strokeWidth={1.2} className="mr-2" />
                    I am unable to speak
                </Button>
            }
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
                                'bg-neutral-800 text-white text-sm': message.role === 'client',
                                'bg-lime-900 text-white text-md': message.role !== 'client',
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
        <div className="relative z-40 w-full h-full pt-12 pb-20 pr-0">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-4">

                    <SosProcedureStarted />
                    <SosAcknowledgement />
                    <SosCallback />
                    <AllMessages />

                </div>
            </ScrollArea>
        </div>
    )
}

export default ChatMessages;