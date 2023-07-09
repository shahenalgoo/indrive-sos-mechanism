'use client';

// React
import { FC, HTMLAttributes } from "react";
import Image from "next/image";

// Lib
import { cn } from "@/lib/override-classes";
import { useGlobalState } from "@/lib/global-states";

// Sos components
import SosModalHeader from "./SosModalHeader";
import BenefitsCard from "./BenefitsCard";
import StartRequest from "./StartRequest";
import Chat from "../chat/Chat";




interface SosModalProps extends HTMLAttributes<HTMLDivElement> { }

const SosModal: FC<SosModalProps> = ({ className, ...props }) => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');

    return sosModal ? (
        <div {...props} className={cn(`sos-modal absolute top-0 left-0 z-40 w-full h-full flex flex-col bg-white text-black ${className}`)}>

            <SosModalHeader />

            {!sosInitiated &&
                <div className="pt-16 h-full flex flex-col">
                    <figure className="w-full px-4">
                        <Image src='/video.png' width={670} height={368} alt="inDrive Assistance" className="w-auto h-auto rounded-xl border border-border" />
                    </figure>
                    <BenefitsCard />
                    <StartRequest />
                </div>
            }

            {sosInitiated && <Chat />}

        </div>
    ) : null
}

export default SosModal;