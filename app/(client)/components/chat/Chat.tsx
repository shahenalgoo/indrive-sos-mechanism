'use client';

// React
import { FC } from "react";

// Chat
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import EmergencyOptions from "./feedbacks/EmergencyOptions";




const Chat: FC = () => {

    return (
        <div className="chat relative z-30 h-full pt-16">
            <EmergencyOptions />
            <ChatMessages />
            <ChatInput />
        </div>
    )
}

export default Chat;