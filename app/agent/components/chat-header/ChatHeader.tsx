'use client';

import { SosReq } from "@/types/typings";
import { FC } from "react";
import Acknowledgement from "./feedbacks/Acknowledgement";
import Callback from "./feedbacks/Callback";
import ClientInformedPolice from "./feedbacks/ClientInformedPolice";
import { Button } from "@/components/ui/button";
import { useAgentSos } from "@/context/AgentSosContext";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
    sosRequest: SosReq | null;
}

const ChatHeader: FC<ChatHeaderProps> = ({ sosRequest }) => {

    const { updateSos } = useAgentSos();
    const router = useRouter();

    const handleChangeReqStatus = () => {
        updateSos(sosRequest, { is_active: false } as SosReq);
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