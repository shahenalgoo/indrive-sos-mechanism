'use client';

// React
import { FC } from "react";
import { useRouter } from "next/navigation";

// Typings
import { SosReq } from "@/types/typings";

// Components
import { Button } from "@/components/ui/button";

// Hooks
import { useAgentSos } from "@/context/AgentSosContext";

// Feedbacks
import Acknowledgement from "./feedbacks/Acknowledgement";
import Callback from "./feedbacks/Callback";
import ClientInformedPolice from "./feedbacks/ClientInformedPolice";




interface ChatHeaderProps {
    sosRequest: SosReq | null;
}

const ChatHeader: FC<ChatHeaderProps> = ({ sosRequest }) => {

    // Hooks
    //
    const { updateSos } = useAgentSos();
    const router = useRouter();

    // Change request status
    const handleChangeReqStatus = async () => {
        await updateSos(sosRequest, { is_active: false } as SosReq);
        router.push('/agent/sos');
    }

    return (
        <div className="h-16 px-4 flex items-center gap-2 border-b border-border">
            <Acknowledgement sosRequest={sosRequest} />
            <Callback sosRequest={sosRequest} />
            <ClientInformedPolice sosRequest={sosRequest} />

            <div className="ml-auto flex gap-2">
                <Button>
                    Call Rider
                </Button>
                <Button>
                    Call Police
                </Button>
                <Button onClick={handleChangeReqStatus}>
                    Close SOS
                </Button>
            </div>
        </div>
    )
}

export default ChatHeader;