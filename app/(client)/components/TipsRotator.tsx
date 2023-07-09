'use client';

// React
import { FC, useEffect, useState } from "react";

// Components
import Box from "@/components/ui/box";




interface TipsRotatorProps {
    tips: string[];
    interval?: number;
}

const TipsRotator: FC<TipsRotatorProps> = ({ tips, interval = 2000 }) => {

    // States
    //
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % tips.length);
        }, interval);

        return () => {
            clearInterval(timer);
        };
    }, [tips, interval]);

    return (
        <Box space='sm' className="text-xs border-none bg-neutral-800 text-white">
            {tips[currentTextIndex]}
        </Box>
    )
}

export default TipsRotator;