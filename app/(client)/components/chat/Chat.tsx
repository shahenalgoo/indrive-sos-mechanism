'use client';

import Panel from "@/components/Panel";
import { Button } from "@/components/ui/button";
import { setGlobalState, useGlobalState } from "@/lib/global-states";
import { FC } from "react";
import { TbX } from "react-icons/tb";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";


const Chat: FC = () => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');

    return (
        <Panel className="relative shrink-0 h-full rounded-none p-0">

            {/* Chat Header */}
            <div className="chat-header absolute top-0 left-0 z-50 w-full h-12 pl-4 pr-2 flex justify-between items-center bg-white border-b border-border">
                <h1 className="text-center font-bold">
                    InDrive SOS
                </h1>

                <Button onClick={() => setGlobalState('sosModal', !sosModal)} size='icon' className="rounded-full">
                    <TbX />
                </Button>
            </div>

            {/* Chat Messages */}
            <ChatMessages />

            {/* Chat Input */}
            <ChatInput />

        </Panel>
    )
}

export default Chat;