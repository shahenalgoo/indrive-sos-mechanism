'use client';

// React
import { FC } from "react";

// Typings
import { SosReq } from "@/types/typings";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { TbArrowRight } from "react-icons/tb";

// Libs
import { setGlobalState } from "@/lib/global-states";

// Hooks
import { useUser } from "@/context/SessionContext";
import { useClientSos } from "@/context/ClientSosContext";

// Appwrite db
import { AppwriteIds, databases } from "@/lib/appwrite-config";
import { ID } from "appwrite";




const StartRequest: FC = () => {

    // Hooks
    //
    const { user } = useUser();
    const { sosReq } = useClientSos();


    // Create SOS Request
    //
    const handleSOSReq = async () => {
        if (sosReq) {
            console.log("SOS REQ ALREADY ACTIVE");
            setGlobalState('sosInitiated', true) // as safety
            return
        }

        try {
            const res = await databases.createDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, ID.unique(), {
                is_active: true,
                initiator: user?.$id,
                initiator_name: user?.name,
                initiator_phone: user?.phone,
                can_speak: true,
                req_acknowledged: false,
                initiator_informed_police: false,
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
        <div className="mt-auto p-4 bg-neutral-100">
            <p className="mb-4 text-xs text-neutral-500 text-center">
                By using the button below, you agree to the <br />
                <a href="/ride" className="underline text-black font-bold">terms & conditions</a> of the inDrive SOS System.
            </p>

            <Button onClick={handleSOSReq} variant='accent' size='lg' className="w-full font-bold">
                Request Assistance
                <TbArrowRight size={20} strokeWidth={2} className="ml-2" />
            </Button>
        </div>
    );
}

export default StartRequest;