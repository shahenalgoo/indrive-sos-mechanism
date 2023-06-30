import { FC, useRef, useState } from "react";

import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {

}

const ChatInput: FC<ChatInputProps> = () => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [input, setInput] = useState<string>('');

    return (
        <div className="absolute bottom-0 left-0 z-50 w-full p-4 bg-white">
            <TextareaAutosize
                ref={textareaRef}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()

                        // const message: Message = {
                        //     id: nanoid(),
                        //     isUserMessage: true,
                        //     text: input,
                        // }

                        // sendMessage(message)
                    }
                }}
                rows={2}
                maxRows={2}
                autoFocus
                value={input}
                // disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Write a message...'
                className='pl-4 pr-14 resize-none block w-full rounded-xl border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm disabled:opacity-50'
            />
        </div>
    )
}

export default ChatInput;