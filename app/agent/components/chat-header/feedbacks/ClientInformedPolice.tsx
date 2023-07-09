import Box from "@/components/ui/box";
import { FC } from "react";
import { SosReq } from "@/types/typings";
import { TbAlertTriangle, TbChecks } from "react-icons/tb";

interface ClientInformedPoliceProps {
    sosRequest: SosReq | null
}

const ClientInformedPolice: FC<ClientInformedPoliceProps> = ({ sosRequest }) => {
    return (
        <Box space='sm' className={`h-10 p-1 flex justify-between items-center text-xs text-black border-none ${sosRequest?.initiator_informed_police ? 'bg-lime-200' : 'bg-rose-200'}`}>
            <div className="flex items-center gap-2 ml-1">
                {!sosRequest?.initiator_informed_police && <TbAlertTriangle size={20} strokeWidth={2} className="text-rose-600" />}
                {sosRequest?.initiator_informed_police && <TbChecks size={20} strokeWidth={2} className="text-lime-600" />}
                <p className="font-semibold pr-3">
                    {!sosRequest?.initiator_informed_police && 'Rider did not call police'}
                    {sosRequest?.initiator_informed_police && 'Rider called police'}
                </p>
            </div>
        </Box>
    )
}

export default ClientInformedPolice;