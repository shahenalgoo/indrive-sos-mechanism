// React
import { FC } from "react";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { TbX } from "react-icons/tb";

// Libs
import { setGlobalState, useGlobalState } from "@/lib/global-states";

// SOS
import Acknowledgement from "../chat/feedbacks/Acknowledgement";




const SosModalHeader: FC = () => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');

    return (
        <div className="sos-header absolute top-0 left-0 w-full z-50 mb-4 flex justify-between items-center pt-4 px-4">
            <div className="flex items-center gap-3">
                <h1 className="text-lg font-medium">inDrive SOS</h1>

                {/* Appears on chat, wherever a safety agent has acknowledged the request or not yet. */}
                {sosInitiated && <Acknowledgement />}
            </div>

            <Button onClick={() => setGlobalState('sosModal', !sosModal)} variant='outline' size='icon' className="rounded-full">
                <TbX />
            </Button>
        </div>
    )
}

export default SosModalHeader;