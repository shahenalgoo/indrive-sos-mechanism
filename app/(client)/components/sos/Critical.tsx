import Panel from "@/components/Panel";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { setGlobalState, useGlobalState } from "@/lib/global-states";
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

    return (
        <div className="flex flex-col place-content-end h-[calc(100vh_-_50px)]">
            <div className="flex-1 min-h-0 p-4 pr-0">
                <ScrollArea className="h-full w-full">
                    <div className="flex flex-col gap-2 pr-4">

                        <SosProcedure />
                        {/* 
                        <Box>
                            <h6 className="mb-1 text-sm text-secondary uppercase font-bold">SOS Procedure started</h6>
                            <p className="text-sm text-neutral-400">All the necessary information about your ride has been sent in emergency to inDrive.</p>
                        </Box> */}

                    </div>
                </ScrollArea>
            </div>

            <Panel className="shrink-0">

                test
                {/* <Button onClick={() => setGlobalState('sosModal', false)}>
                    close
                </Button> */}

            </Panel>
        </div>
    );
}

export default CriticalPanel;