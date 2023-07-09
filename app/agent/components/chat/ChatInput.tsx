'use client';

// React
import { FC, useRef, useState } from "react";

// Typings
import { SosReq } from "@/types/typings";

// Hooks
import { useUser } from "@/context/SessionContext";

// Libs
import { functions } from "@/lib/appwrite-config";

// Components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";

// Icons
import { TbTemplate } from "react-icons/tb";

// Other
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
    //
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);


    // Hooks
    //
    const { user } = useUser();


    // No user
    //
    if (!user) {
        console.log('No user found');
        return
    }


    // SEND MESSAGE
    //
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


    // ON SUBMIT
    //
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


    // REPLY TEMPLATES
    //
    const template1 = () => {
        setInput('Hello my name is Tim, your SOS request has been acknowledged and I will assist you to the best of my abilities.');
    }

    const template2 = () => {
        setInput('I would like to inform you that the authorities have been contacted on your behalf.');
    }

    return (
        <div className="absolute bottom-0 left-0 z-50 w-full p-4 flex gap-2 bg-neutral-100 border-t border-border">

            {/* Reply Templates */}
            <DropdownMenu>
                <DropdownMenuTrigger className=" outline-none">
                    <div className={buttonVariants({ variant: "default", size: "icon" })}>
                        <TbTemplate size={20} />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className=" max-w-xs">
                    <DropdownMenuLabel className="text-neutral-400">Reply Templates</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <button onClick={template1} className="text-left p-2 rounded-md hover:bg-neutral-100">
                            <h4 className="mb-1 text-sm font-bold">Say hello</h4>
                            <p className="text-xs">Hello my name is Tim, your SOS request has been acknowledged and I will assist you to the best of my abilities.</p>
                        </button>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <button onClick={template2} className="text-left p-2 rounded-md hover:bg-neutral-100">
                            <h4 className="mb-1 text-sm font-bold">Inform rider that you called the police.</h4>
                            <p className="text-xs">I would like to inform you that the authorities have been contacted on your behalf.</p>
                        </button>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>


            {/* Input */}
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