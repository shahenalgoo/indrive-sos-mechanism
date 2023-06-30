'use client'

import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Box from "@/components/ui/box";
import Link from "next/link";
import { useSosRequests } from "@/context/AgentSosContext";

const LeftSidebar: FC = () => {
    const { sosReqs } = useSosRequests();


    return (
        <aside className="shrink-0 w-80 h-full border-r border-border">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-2">
                    {sosReqs?.map((req, i) => (
                        <Link key={i} href={"/agent/sos/" + req.$id} >
                            <Box variant='border' className="text-sm">
                                <h6 className="font-bold">Incoming SOS Request - {sosReqs.length - i}</h6>
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