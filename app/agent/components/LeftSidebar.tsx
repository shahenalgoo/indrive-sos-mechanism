import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Box from "@/components/ui/box";
import Link from "next/link";

const LeftSidebar: FC = () => {
    return (
        <aside className="shrink-0 w-80 h-full border-r border-border">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-2">

                    <Link href="/agent/sos/test">
                        <Box variant='border' className="text-sm">
                            <h6 className="font-bold">Incoming SOS Request - #1542</h6>
                            <p className="text-semibold">Severity: Critical</p>
                        </Box>
                    </Link>

                </div>
            </ScrollArea>
        </aside>
    )
}

export default LeftSidebar;