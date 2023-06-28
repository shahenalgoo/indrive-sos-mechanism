'use client';

// React
import { FC, HTMLAttributes } from "react";

// Lib
import { cn } from "@/lib/override-classes";
import { useGlobalState } from "@/lib/global-states";
import Navbar from "./Navbar";
import SeverityPanel from "./Severity";
import CriticalPanel from "./Critical";


interface SOSModalProps extends HTMLAttributes<HTMLDivElement> { }

const SOSModal: FC<SOSModalProps> = ({ className, ...props }) => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');

    return sosModal ? (
        <div {...props} className={cn(`absolute top-0 left-0 w-full h-full backdrop-blur-lg bg-black/80 z-50 text-white ${className}`)}>

            {/* <Navbar /> */}

            {!sosInitiated && <SeverityPanel />}
            {sosInitiated && <CriticalPanel />}
        </div>
    ) : null
}

export default SOSModal;