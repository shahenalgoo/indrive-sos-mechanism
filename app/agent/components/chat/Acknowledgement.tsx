import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useAgentSos } from "@/context/AgentSosContext";
import { useClientSos } from "@/context/ClientSosContext";
import { SosReq } from "@/types/typings";
import { FC } from "react";
import { TbChecks, TbLoader2, TbUserShield } from "react-icons/tb";

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
        <Box space='sm' className={`flex justify-between items-center text-black ${sosRequest?.req_acknowledged ? 'bg-lime-200' : 'bg-orange-300'}`}>
            <div className="flex items-center gap-3">
                {!sosRequest?.req_acknowledged && <TbLoader2 size={20} strokeWidth={2} className="animate-spin opacity-30" />}
                {sosRequest?.req_acknowledged && <TbChecks size={20} strokeWidth={2} className="text-lime-600" />}
                <p className="font-semibold">
                    {!sosRequest?.req_acknowledged && 'The passenger is awaiting a response.'}
                    {sosRequest?.req_acknowledged && 'You acknowledged the SOS request.'}
                </p>
            </div>
            {!sosRequest?.req_acknowledged &&
                <Button onClick={handleAcknowledge} variant='default'>
                    <TbChecks size={20} strokeWidth={2} className="mr-2" /> Acknowledge Request
                </Button>
            }
        </Box>
    )
}

export default Acknowledgement;