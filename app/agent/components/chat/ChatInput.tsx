import { useClientSos } from "@/context/ClientSosContext";
import { useUser } from "@/context/SessionContext";
import { functions } from "@/lib/appwrite-config";
import { SosReq } from "@/types/typings";
import { FC, useRef, useState } from "react";

import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
    id: string;
    sosRequest: SosReq | null;
}

const ChatInput: FC<ChatInputProps> = ({ id, sosRequest }) => {

    // States
    //
    const [input, setInput] = useState<string>('');

    // Ref
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Hooks
    //
    const { user } = useUser();

    // No user 😵
    if (!user) {
        console.log('No user found');
        return
    }


    const onSubmit = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (input === '') {
                return;
            }

            sendMessage();
            setInput('');
        }
    }


    // Agent sends message to client
    const sendMessage = async () => {
        if (!sosRequest) {
            console.log("SOS REQUEST NOT FOUND");
            return;
        }

        try {
            const payload = {
                sos_related: id,
                agentId: user?.$id,
                message: input,
                clientId: sosRequest.initiator
            }
            await functions.createExecution(process.env.NEXT_PUBLIC_FUNCTION_SEND_MESSAGE as string, JSON.stringify(payload));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="absolute bottom-0 left-0 z-50 w-full p-4 bg-neutral-100 border-t border-border">
            <TextareaAutosize
                ref={textareaRef}
                onKeyDown={onSubmit}
                rows={2}
                maxRows={2}
                autoFocus
                value={input}
                // disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Write a message...'
                className='pl-4 pr-14 resize-none block w-full rounded-xl border border-border focus:border-neutral-400 bg-white py-3 text-black outline-none disabled:opacity-50'
            />
        </div>
    )
}

export default ChatInput;