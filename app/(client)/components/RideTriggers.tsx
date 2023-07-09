'use client';

// React
import { FC } from "react";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { TbShieldCheckFilled, TbSos } from "react-icons/tb";

// Libs
import { setGlobalState, useGlobalState } from "@/lib/global-states";




const RideTriggers: FC = () => {

    // States
    //
    const [sosModal] = useGlobalState('sosModal');
    const [sosInitiated] = useGlobalState('sosInitiated');


    // Precautions
    //
    const handlePrecautionsModal = () => {
        setGlobalState('sosModal', false);
        setGlobalState('precautionsModal', true);
    }


    return (
        <>
            <Button onClick={handlePrecautionsModal} size='icon' className="rounded-full w-12 h-12 bg-black text-white shadow-2xl">
                <TbShieldCheckFilled size={20} />
            </Button>

            <Button onClick={() => setGlobalState('sosModal', !sosModal)} size='icon' className="rounded-full w-12 h-12 bg-black text-white shadow-2xl">
                <TbSos size={24} className={sosInitiated ? 'text-secondary' : ''} />
                {sosInitiated && <TbSos size={24} className="absolute text-secondary animate-ping" />}
            </Button>
        </>
    );
}

export default RideTriggers;