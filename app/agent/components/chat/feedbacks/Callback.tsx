import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { SosReq } from "@/types/typings";
import { FC } from "react";
import { TbAlertTriangle, TbChecks, TbPhoneCall } from "react-icons/tb";

interface CallbackProps {
    sosRequest: SosReq | null
}

const Callback: FC<CallbackProps> = ({ sosRequest }) => {
    return (
        <Box space='sm' className={`flex justify-between items-center text-black ${sosRequest?.can_speak ? 'bg-lime-200' : 'bg-rose-200'}`}>
            <div className="flex items-center gap-3">
                {sosRequest?.can_speak && <TbChecks size={20} strokeWidth={2} className="text-lime-600" />}
                {!sosRequest?.can_speak && <TbAlertTriangle size={20} strokeWidth={2} className="text-rose-600" />}
                <p className="font-semibold">
                    {sosRequest?.can_speak && 'The passenger can speak.'}
                    {!sosRequest?.can_speak && 'The passenger cannot speak.'}
                </p>
            </div>
            <Button variant='default'>
                <TbPhoneCall size={20} strokeWidth={2} className="mr-2" /> Call Passenger
            </Button>
        </Box>
    )
}

export default Callback;