'use client';

// React
import { FC, HTMLAttributes, MouseEventHandler, ReactNode } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Utils
import { cn } from "@/lib/override-classes";
import { setGlobalState, useGlobalState } from "@/lib/global-states";

// Icns
import { TbCircle, TbCircleCheck, TbCircleCheckFilled, TbX } from 'react-icons/tb';
import { Severity } from "@/types/enums";
import { AppwriteIds, databases } from "@/lib/appwrite-config";
import { ID } from "appwrite";
import { SosReq } from "@/types/typings";
import { useUser } from "@/context/SessionContext";
import { useClientSos } from "@/context/ClientSosContext";


/**
 * SELECTOR
 * 
 */

interface SeverityOptions {
    severity: Severity;
    title?: string;
    color: string;
    children?: ReactNode;
}

const SeverityOptions: FC<SeverityOptions> = ({ severity, title, color, children }) => {

    const [severityState] = useGlobalState('sosSeverity');

    return (
        <button
            onClick={() => setGlobalState('sosSeverity', severity)}
            className={`border rounded-xl flex items-center ${severityState === severity ? 'border-black' : 'border-border'}`}
        >
            <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                {severityState !== severity && <TbCircle size={20} strokeWidth={1} className=" opacity-20" />}
                {severityState === severity && <TbCircleCheckFilled size={20} strokeWidth={1} />}
            </div>
            <div className="flex flex-col text-left py-2 pl-2 pr-4">
                <h6 className="font-bold">{title || severity}</h6>
                {children && <p className="text-xs text-neutral-500">{children}</p>}
                <span className={`inline-block w-6 h-1 mt-3 rounded-full ${color}`}>&nbsp;</span>
            </div>
        </button>
    )
}


/**
 * MAIN
 * 
 */
interface SeveritySelectorProps extends HTMLAttributes<HTMLDivElement> { }

const SeveritySelector: FC<SeveritySelectorProps> = ({ className, ...props }) => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');
    const [sosSeverity] = useGlobalState('sosSeverity');

    // Hooks
    const { user } = useUser();
    const { sosReq, setSosReq } = useClientSos();



    // Create SOS Request
    const handleSOSReq = async () => {
        if (sosReq) {
            console.log("SOS REQ ALREADY ACTIVE");
            setGlobalState('sosInitiated', true) // as safety
            return;
        }

        try {
            const res = await databases.createDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, ID.unique(), {
                severity: sosSeverity.toLowerCase(),
                is_active: true,
                initiator: user?.$id,
                can_speak: true,
                req_acknowledged: false,
                agent_informed_police: false,
                initiator_informed_police: false,
                initiator_informed_contacts: false
            } as SosReq);

            console.log("Req created successfully,", res);
            setGlobalState('sosInitiated', true)
            // setSosReq(res as SosReq);

        } catch (error) {
            console.log("Could not create SOS Request");
            console.log(error);

        }
    }

    return (
        <div {...props} className={cn(` absolute bottom-0 left-0 w-full h-auto bg-white text-black py-8 px-6 rounded-tl-3xl rounded-tr-3xl ${className}`)}>

            <h4 className="text-sm font-bold">Select Severity</h4>

            <div className="flex flex-col gap-2 mt-4 mb-6">
                <SeverityOptions
                    severity={Severity.minor}
                    color="bg-minor" />

                <SeverityOptions
                    severity={Severity.moderate}
                    color="bg-moderate" />

                <SeverityOptions
                    severity={Severity.critical}
                    color="bg-critical"
                    title="Critical - SOS"
                >
                    We will call emergency on your behalf and do our best to assist you.
                </SeverityOptions>
            </div>


            <div className="flex gap-2">
                <Button onClick={() => setGlobalState('sosModal', !sosModal)} variant='ghost' size='lg' className="flex-2">
                    Cancel
                </Button>

                <Button onClick={() => handleSOSReq()} variant='accent' size='lg' className="flex-1">
                    Send SOS
                </Button>
            </div>

        </div>
    )
}

export default SeveritySelector;