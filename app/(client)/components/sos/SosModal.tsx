'use client';

// React
import { FC, HTMLAttributes } from "react";

// Lib
import { cn } from "@/lib/override-classes";
import { setGlobalState, useGlobalState } from "@/lib/global-states";
import SeveritySelector from "../SeveritySelector";
import CriticalPanel from "../sos-modal/Critical";

import Chat from "../chat/Chat";
import { Button } from "@/components/ui/button";
import { TbPlayerPlay, TbX } from "react-icons/tb";
import StartRequest from "./StartRequest";
import BenefitsCard from "./BenefitsCard";
import Image from "next/image";


interface SosModalProps extends HTMLAttributes<HTMLDivElement> { }

const SosModal: FC<SosModalProps> = ({ className, ...props }) => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');

    return sosModal ? (
        <div {...props} className={cn(`absolute top-0 left-0 z-40 w-full h-full pt-4 flex flex-col bg-white text-black ${className}`)}>

            {/* Header */}
            <div className="mb-4 flex justify-between items-center px-4">
                <h1 className="text-lg font-medium">inDrive SOS</h1>
                <Button onClick={() => setGlobalState('sosModal', !sosModal)} variant='outline' size='icon' className="rounded-full">
                    <TbX />
                </Button>
            </div>

            <figure className="w-full px-4">
                <Image src='/video.png' width={670} height={368} alt="inDrive Assistance" className="w-auto h-auto rounded-xl border border-border" />
            </figure>

            <BenefitsCard />
            <StartRequest />

            {/* {!sosInitiated && <SeveritySelector />} */}
            {/* {sosInitiated && <CriticalPanel />} */}
            {/* {sosInitiated && <Chat />} */}


        </div>
    ) : null
}

export default SosModal;