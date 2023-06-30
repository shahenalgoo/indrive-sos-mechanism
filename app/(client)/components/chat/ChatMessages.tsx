'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";

import { messages } from "@/data/messages";
import Box from "@/components/ui/box";
import { TbChecks, TbCircle, TbCircleCheck, TbCircleCheckFilled, TbCircleX, TbLoader, TbLoader2 } from "react-icons/tb";
import { useSosReq } from "@/context/SosReqContext";
import { Button } from "@/components/ui/button";
import { AppwriteIds, databases } from "@/lib/appwrite-config";
import { SosReq } from "@/types/typings";


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

    const { sosReq } = useSosReq();

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

    const { sosReq } = useSosReq();

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
 * MAIN EXPORT
 * 
 */
const ChatMessages: FC = () => {

    const inverseMessages = [...messages].reverse()

    return (
        <div className="relative z-40 w-full h-full pt-12 pb-20 pr-0">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-4">

                    <SosProcedureStarted />
                    <SosAcknowledgement />
                    <SosCallback />

                    {/* Chat Messages */}
                    <div className="flex flex-col-reverse">
                        {inverseMessages.map((message, i) => (
                            <div key={i}>
                                {message.message}
                            </div>
                        ))}
                    </div>

                    {/* 
                    <p>start --- message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message</p>
                    <p>message --- end</p> */}

                </div>
            </ScrollArea>
        </div>
    )
}

export default ChatMessages;