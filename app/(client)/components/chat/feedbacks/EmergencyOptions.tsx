// React
import { FC } from "react";

// Tpyings
import { SosReq } from "@/types/typings";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { MdOutlineLocalPolice } from 'react-icons/md';

// Hooks
import { useClientSos } from "@/context/ClientSosContext";




const EmergencyOptions: FC = () => {

    // Hooks
    //
    const { sosReq, updateSos } = useClientSos();


    // Update request
    //
    const handleInformPolice = () => {
        updateSos(sosReq, { initiator_informed_police: true } as SosReq);
    }

    return (
        <div className="flex justify-between items-center p-2 px-4 bg-black">
            <p className="text-xs text-neutral-400">In the meantime</p>
            <div className="flex gap-2">
                <Button onClick={handleInformPolice} size='sm' variant='destructive' className="rounded-full bg-rose-700 text-white">
                    <MdOutlineLocalPolice size={18} className="mr-2" />
                    Call Police
                </Button>
            </div>
        </div>
    )
}

export default EmergencyOptions;