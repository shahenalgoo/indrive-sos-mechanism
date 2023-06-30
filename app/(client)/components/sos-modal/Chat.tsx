import Panel from "@/components/Panel";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setGlobalState, useGlobalState } from "@/lib/global-states";
import { FC } from "react";
import { TbX } from "react-icons/tb";


/**
 * HEADER
 * 
 */
interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');

    return (
        <div className="flex justify-between items-center py-2 pl-4 pr-2">
            <h1 className="font-bold">InDrive SOS</h1>
            <Button onClick={() => setGlobalState('sosModal', !sosModal)} size='icon' className="rounded-full">
                <TbX />
            </Button>
        </div>
    );
}



/**
 * CHAT MESSAGES
 * 
 */
interface ChatMessagesProps {

}

const ChatMessages: FC<ChatMessagesProps> = () => {
    return (
        <div>
            <ScrollArea className="h-[200px] w-full rounded-md border-t border-b p-4">
                Jokester began sneaking into the castle in the middle of the night and leaving
                jokes all over the place: under the kings pillow, in his soup, even in the
                royal toilet. The king was furious, but he couldnt seem to stop Jokester. And
                then, one day, the people of the kingdom discovered that the jokes left by
                Jokester were so funny that they couldnt help but laugh. And once they
                started laughing, they couldnt stop.
            </ScrollArea>
        </div>
    );
}


/**
 * MAIN
 * 
 */
const ChatPanel: FC = () => {

    return (
        <Panel className="h-full p-0">

            <Header />
            <ChatMessages />

        </Panel>
    );
}

export default ChatPanel;