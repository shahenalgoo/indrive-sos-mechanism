import { Button } from "@/components/ui/button";
import { FC } from "react";

import { MdOutlineLocalPolice } from 'react-icons/md';
import { TbMessage } from "react-icons/tb";

const EmergencyOptions: FC = () => {
    return (
        <div className="flex justify-between items-center p-2 px-4 bg-black">
            <p className="text-xs text-neutral-400">In the meantime</p>
            <div className="flex gap-2">
                <Button size='sm' variant='destructive' className="rounded-full bg-rose-700 text-white">
                    <MdOutlineLocalPolice size={18} className="mr-2" />
                    Call Police
                </Button>
                {/* <Button size='sm' variant='destructive' className="rounded-full bg-rose-700 text-white">
                    <TbMessage size={18} className="mr-2" />
                    Text 911
                </Button> */}
            </div>
        </div>
    )
}

export default EmergencyOptions;