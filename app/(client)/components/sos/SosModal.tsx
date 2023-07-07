'use client';

// React
import { FC, HTMLAttributes } from "react";
import Image from "next/image";

// Lib
import { cn } from "@/lib/override-classes";
import { setGlobalState, useGlobalState } from "@/lib/global-states";

import Chat from "../chat/Chat";
import { Button } from "@/components/ui/button";

import StartRequest from "./StartRequest";
import BenefitsCard from "./BenefitsCard";

// Icons
import { TbX } from "react-icons/tb";
import Acknowledgement from "../chat/Acknowledgement";
import SosModalHeader from "./SosModalHeader";


interface SosModalProps extends HTMLAttributes<HTMLDivElement> { }

const SosModal: FC<SosModalProps> = ({ className, ...props }) => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');

    return sosModal ? (
        <div {...props} className={cn(`sos-modal absolute top-0 left-0 z-40 w-full h-full flex flex-col bg-white text-black ${className}`)}>

            {/* Header */}
            <SosModalHeader />

            {/* Confirmation Panel */}
            {!sosInitiated &&
                <div className="pt-16">
                    <figure className="w-full px-4">
                        <Image src='/video.png' width={670} height={368} alt="inDrive Assistance" className="w-auto h-auto rounded-xl border border-border" />
                    </figure>
                    <BenefitsCard />
                    <StartRequest />
                </div>
            }

            {/* Chat Panel */}
            {sosInitiated && <Chat />}

        </div>
    ) : null
}

export default SosModal;