'use client';

import { Button } from "@/components/ui/button";
import { setGlobalState, useGlobalState } from "@/lib/global-states";
import { FC } from "react";
import { TbAlertTriangleFilled, TbShieldCheckFilled } from "react-icons/tb";


const RideTriggers: FC = () => {

    const [sosModal] = useGlobalState('sosModal');


    return (
        <>
            <Button onClick={() => setGlobalState('sosModal', !sosModal)} size='icon' className="rounded-full w-12 h-12 bg-black text-white shadow-2xl">
                <TbAlertTriangleFilled size={20} />
            </Button>

            <Button onClick={() => setGlobalState('sosModal', !sosModal)} size='icon' className="rounded-full w-12 h-12 bg-black text-white shadow-2xl">
                <TbShieldCheckFilled size={20} />
            </Button>
        </>
    );
}

export default RideTriggers;