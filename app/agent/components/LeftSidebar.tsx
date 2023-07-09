'use client';

// React
import { FC } from "react";
import { useParams } from 'next/navigation'
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import { ScrollArea } from "@/components/ui/scroll-area";
import Box from "@/components/ui/box";

// Hooks
import { useAgentSos } from "@/context/AgentSosContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/SessionContext";




const LeftSidebar: FC = () => {

    // Hooks
    //
    const { logout, user } = useUser();
    const { allRequests } = useAgentSos();
    const params = useParams();
    const router = useRouter();


    // Logout
    //
    const onLogout = async () => {
        logout();
        router.push('/agent')
    }

    return (
        <aside className="relative shrink-0 w-80 h-screen border-r border-border text-black">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-2">
                    {allRequests?.map((req, i) => (
                        <Link key={i} href={"/agent/sos/" + req.$id} >
                            <Box variant='border' className={params.id === req.$id ? 'border-black' : ''}>
                                <h6 className="font-bold">SOS Request #{allRequests.length - i}</h6>
                            </Box>
                        </Link>
                    ))}
                </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 w-full border-t border-border p-2 bg-white">
                <Button onClick={onLogout} variant='outline'>
                    Logout
                </Button>
            </div>
        </aside>
    )
}

export default LeftSidebar;