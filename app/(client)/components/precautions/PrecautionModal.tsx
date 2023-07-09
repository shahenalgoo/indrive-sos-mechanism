'use client';

// React
import { FC } from "react";

// Libs
import { useGlobalState } from "@/lib/global-states";

// Precautions
import PrecautionsModalHeader from "./PrecautionModalHeader";
import PrecautionOptions from "./content/PrecautionOptions";
import PrecautionEducation from "./content/PrecautionEducation";




const PrecautionsModal: FC = () => {

    // States
    //
    const [precautionsModal] = useGlobalState('precautionsModal');


    return precautionsModal ? (
        <div className="sos-modal absolute top-0 left-0 z-40 w-full h-full flex flex-col bg-white text-black">
            <PrecautionsModalHeader />

            <div className="pt-16 px-4">
                <PrecautionEducation />
                <PrecautionOptions />
            </div>
        </div>
    ) : null
}

export default PrecautionsModal;