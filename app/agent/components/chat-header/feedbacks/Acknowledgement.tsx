// React
import { FC } from "react";

// Typings
import { SosReq } from "@/types/typings";

// Components
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";

// Hooks
import { useAgentSos } from "@/context/AgentSosContext";

// Icons
import { TbChecks, TbLoader2, } from "react-icons/tb";




interface AcknowledgementProps {
    sosRequest: SosReq | null
}

const Acknowledgement: FC<AcknowledgementProps> = ({ sosRequest }) => {

    // Hooks
    //
    const { updateSos } = useAgentSos();


    // Update request
    const handleAcknowledge = () => {
        updateSos(sosRequest, { req_acknowledged: true } as SosReq);
    }


    return (
        <Box space='sm' className={`h-10 p-1 flex justify-between items-center text-xs text-black border-none ${sosRequest?.req_acknowledged ? 'bg-lime-200' : 'bg-orange-300'}`}>
            <div className="flex items-center gap-2 ml-1">
                {!sosRequest?.req_acknowledged && <TbLoader2 size={20} strokeWidth={2} className="animate-spin opacity-30" />}
                {sosRequest?.req_acknowledged && <TbChecks size={20} strokeWidth={2} className="text-lime-600" />}
                <p className="font-semibold pr-3">
                    {!sosRequest?.req_acknowledged && 'Acknowledge'}
                    {sosRequest?.req_acknowledged && 'Acknowledged'}
                </p>
            </div>
            {!sosRequest?.req_acknowledged &&
                <Button onClick={handleAcknowledge} variant='default' size='sm'>
                    Confirm
                </Button>
            }
        </Box>
    )
}

export default Acknowledgement;