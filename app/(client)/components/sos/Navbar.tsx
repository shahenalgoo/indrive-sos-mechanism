'use client';

import { FC, HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/override-classes";
import { setGlobalState, useGlobalState } from "@/lib/global-states";

import { TbX } from 'react-icons/tb';

interface NavbarProps extends HTMLAttributes<HTMLDivElement> { }

const Navbar: FC<NavbarProps> = ({ className, ...props }) => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');

    return (
        <nav {...props} className={cn(`h-16 flex justify-between items-center px-6 ${className}`)}>

            <h1 className="text-center font-bold">
                {!sosInitiated && `InDrive Help`}
                {sosInitiated && `InDrive SOS`}
            </h1>

            <Button onClick={() => setGlobalState('sosModal', !sosModal)} size='icon'>
                <TbX />
            </Button>

        </nav>
    )
}

export default Navbar;