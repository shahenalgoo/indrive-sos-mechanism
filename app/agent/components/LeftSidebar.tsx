'use client'

import { FC } from "react";
import { useParams } from 'next/navigation'

import { ScrollArea } from "@/components/ui/scroll-area";
import Box from "@/components/ui/box";
import Link from "next/link";
import { useAgentSos } from "@/context/AgentSosContext";

const LeftSidebar: FC = () => {

    const { allRequests } = useAgentSos();
    const params = useParams();


    return (
        <aside className="shrink-0 w-80 h-full border-r border-border text-black">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-2">
                    {allRequests?.map((req, i) => (
                        <Link key={i} href={"/agent/sos/" + req.$id} >
                            <Box variant='border' className={params.id === req.$id ? 'border-secondary' : ''}>
                                <h6 className="font-bold">SOS Request #{allRequests.length - i}</h6>
                                <p className="text-semibold">Severity: {req.severity}</p>
                            </Box>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default LeftSidebar;