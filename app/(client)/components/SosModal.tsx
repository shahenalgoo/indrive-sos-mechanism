'use client';

// React
import { FC, HTMLAttributes } from "react";

// Lib
import { cn } from "@/lib/override-classes";
import { useGlobalState } from "@/lib/global-states";
import Navbar from "./sos-modal/Navbar";
import SeveritySelector from "./SeveritySelector";
import CriticalPanel from "./sos-modal/Critical";

import Chat from "./chat/Chat";


interface SosModalProps extends HTMLAttributes<HTMLDivElement> { }

const SosModal: FC<SosModalProps> = ({ className, ...props }) => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');

    return sosModal ? (
        <div {...props} className={cn(`absolute top-0 left-0 w-full h-full bg-black z-40 text-white ${className}`)}>

            {/* <Navbar /> */}

            {!sosInitiated && <SeveritySelector />}
            {/* {sosInitiated && <CriticalPanel />} */}
            {sosInitiated && <Chat />}
        </div>
    ) : null
}

export default SosModal;