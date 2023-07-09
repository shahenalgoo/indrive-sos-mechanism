'use client';

// React
import { FC } from "react";

// Components
import { Button } from "@/components/ui/button";

// Libs
import { TbX } from "react-icons/tb";

// Libs
import { setGlobalState, useGlobalState } from "@/lib/global-states";




const PrecautionsModalHeader: FC = () => {

    // States
    //
    const [precautionsModal] = useGlobalState('precautionsModal');

    return (
        <div className="sos-header absolute top-0 left-0 w-full z-50 mb-4 flex justify-between items-center pt-4 px-4">
            <div className="flex items-center gap-3">
                <h1 className="text-lg font-medium">Precautions</h1>
            </div>

            <Button onClick={() => setGlobalState('precautionsModal', !precautionsModal)} variant='outline' size='icon' className="rounded-full">
                <TbX />
            </Button>
        </div>
    )
}

export default PrecautionsModalHeader;