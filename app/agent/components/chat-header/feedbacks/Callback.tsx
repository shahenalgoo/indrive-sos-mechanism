// React
import { FC } from "react";

// Typings
import { SosReq } from "@/types/typings";

// Components
import Box from "@/components/ui/box";

// Icons
import { TbAlertTriangle, TbChecks } from "react-icons/tb";




interface CallbackProps {
    sosRequest: SosReq | null
}

const Callback: FC<CallbackProps> = ({ sosRequest }) => {
    return (
        <Box space='sm' className={`h-10 p-1 flex justify-between items-center text-xs text-black border-none ${sosRequest?.can_speak ? 'bg-lime-200' : 'bg-rose-200'}`}>
            <div className="flex items-center gap-2 ml-1">
                {sosRequest?.can_speak && <TbChecks size={20} strokeWidth={2} className="text-lime-600" />}
                {!sosRequest?.can_speak && <TbAlertTriangle size={20} strokeWidth={2} className="text-rose-600" />}
                <p className="font-semibold pr-3">
                    {sosRequest?.can_speak && 'Rider can speak'}
                    {!sosRequest?.can_speak && 'Rider cannot speak'}
                </p>
            </div>
        </Box>
    )
}

export default Callback;