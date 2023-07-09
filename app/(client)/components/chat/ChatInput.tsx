// React
import { FC, useRef, useState } from "react";

// Hooks
import { useClientSos } from "@/context/ClientSosContext";
import { useUser } from "@/context/SessionContext";

// Other
import TextareaAutosize from 'react-textarea-autosize';




const ChatInput: FC = () => {

    // States
    //
    const [input, setInput] = useState<string>('');


    // Ref
    //
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);


    // Hooks
    //
    const { sendMessage } = useClientSos();
    const { user } = useUser();


    // No user
    //
    if (!user) {
        console.log('No user found');
        return
    }


    // Submit
    //
    const onSubmit = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            if (input === '') {
                return;
            }

            sendMessage(user?.$id, input);
            setInput('');
        }
    }


    return (
        <div className="chat-input absolute bottom-0 left-0 z-50 w-full p-4 bg-neutral-100 border-t border-border">
            <TextareaAutosize
                ref={textareaRef}
                onKeyDown={onSubmit}
                rows={2}
                maxRows={2}
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Write a message...'
                className='pl-4 pr-14 resize-none block w-full rounded-xl border border-neutral-300 focus:border-neutral-500 bg-white py-3 text-black outline-none disabled:opacity-50'
            />
        </div>
    )
}

export default ChatInput;