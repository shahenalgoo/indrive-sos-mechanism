import Panel from "@/components/ui/panel";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useClientSos } from "@/context/ClientSosContext";
import { AppwriteIds, databases } from "@/lib/appwrite-config";
import { setGlobalState, useGlobalState } from "@/lib/global-states";
import { cn } from "@/lib/override-classes";
import { ThirdPartyHelp } from "@/types/enums";
import { SosReq } from "@/types/typings";
import { FC } from "react";
import { TbX } from "react-icons/tb";



/**
 * SOS Procedure
 * 
 */
interface SosProcedureProps { }

const SosProcedure: FC<SosProcedureProps> = () => {

    return (
        <Box>
            <h6 className="mb-1 text-sm text-secondary uppercase font-bold">SOS Procedure started</h6>
            <p className="text-sm text-neutral-400">All the necessary information about your ride has been sent in emergency to inDrive.</p>
        </Box>
    )
}


/**
 * MAIN
 * 
 */
const CriticalPanel: FC = () => {
    const [sosInitiated] = useGlobalState('sosInitiated');
    const { sosReq, setSosReq } = useClientSos();

    const handleCannotSpeak = async () => {
        if (!sosReq) {
            console.log("SOS REQUEST NOT FOUND");
            return;
        }

        try {

            const res = await databases.updateDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, sosReq.$id, { can_speak: !sosReq.can_speak } as SosReq)

        } catch (error) {
            console.log(error);
        }
    }

    const handleInformedSomeone = async (informParty: ThirdPartyHelp) => {
        if (!sosReq) {
            console.log("SOS REQUEST NOT FOUND");
            return;
        }


        try {

            const res = await databases.updateDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, sosReq.$id, {
                initiator_informed_police: informParty === ThirdPartyHelp.police ? true : sosReq.initiator_informed_police,
                initiator_informed_contacts: informParty === ThirdPartyHelp.contacts ? true : sosReq.initiator_informed_contacts,
            } as SosReq)

        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelSosReq = async () => {
        if (!sosReq) {
            console.log("SOS REQUEST NOT FOUND");
            return;
        }
        try {

            const res = await databases.updateDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, sosReq.$id, { is_active: false } as SosReq)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col place-content-end h-[calc(100vh_-_50px)]">
            <div className="flex-1 min-h-0 p-4 pr-0">
                <ScrollArea className="h-full w-full">
                    <div className="flex flex-col gap-2 pr-4">

                        <SosProcedure />

                        <Box>
                            <p className="text-sm text-neutral-400">Driver - Kenneth Dempsey</p>
                            <p className="text-sm text-neutral-400">License plate - GE54744</p>
                            <p className="text-sm text-neutral-400">Car Description - White...</p>
                        </Box>

                        <Box>
                            <p className="text-sm text-neutral-400">Awaiting safety agent acknowledgement</p>
                        </Box>
                        <Box>

                            <p className="text-sm text-neutral-400">A safety agent will call you on the number associated to this account.</p>
                            <Button onClick={() => handleCannotSpeak()}>
                                I cannot speak
                            </Button>
                        </Box>

                        <Button onClick={() => handleInformedSomeone(ThirdPartyHelp.police)}>
                            Call 911
                        </Button>
                        <Button onClick={() => handleInformedSomeone(ThirdPartyHelp.contacts)}>
                            Inform Trusted Contacts
                        </Button>
                        <Button onClick={() => console.log("CUSTOMER SUPPORT OPENS")}>
                            Chat with Safety Agent
                        </Button>
                        <Button onClick={() => handleCancelSosReq()}>
                            Cancel SOS (Password Required)
                        </Button>
                        <Button onClick={() => setGlobalState('sosModal', false)}>
                            Close
                        </Button>


                    </div>
                </ScrollArea>
            </div>

            <Panel className="shrink-0">

                test
                <Button onClick={() => setGlobalState('sosModal', false)}>
                    close
                </Button>

            </Panel>
        </div>
    );
}

export default CriticalPanel;