'use client';

import Panel from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { setGlobalState, useGlobalState } from "@/lib/global-states";
import { FC } from "react";
import { TbX } from "react-icons/tb";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import EmergencyOptions from "./EmergencyOptions";


const Chat: FC = () => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');

    return (
        <div className="chat relative z-30 h-full pt-16">
            <EmergencyOptions />
            <ChatMessages />
            <ChatInput />
        </div>
    )
}

export default Chat;