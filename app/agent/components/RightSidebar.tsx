'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentSos } from "@/context/AgentSosContext";
import { FC, useEffect } from "react";

const RightSidebar: FC = () => {

    // const { fetchSingleRequest } = useAgentSos();

    // useEffect(() => {
    //     fetchSingleRequest('649ee0c7d428b5fef6ca');


    // }, []);

    return (
        <aside className="shrink-0 w-80 h-full border-l border-border bg-neutral-900">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 pr-4">

                </div>
            </ScrollArea>
        </aside>
    )
}

export default RightSidebar;