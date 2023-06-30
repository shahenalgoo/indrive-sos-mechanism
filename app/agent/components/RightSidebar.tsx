import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";

const RightSidebar: FC = () => {
    return (
        <aside className="shrink-0 w-80 h-full border-l border-border">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 pr-4">

                </div>
            </ScrollArea>
        </aside>
    )
}

export default RightSidebar;