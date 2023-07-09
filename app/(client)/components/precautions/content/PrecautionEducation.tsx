'use client';

// React
import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";

// Libs
import { setGlobalState } from "@/lib/global-states";




const PrecautionEducation: FC = () => {

    // Hooks
    //
    const router = useRouter();


    // Go to ed page
    //
    const handleGoToEd = () => {
        router.push('/safety-education');
        setGlobalState('precautionsModal', false);
    }


    return (
        <Box space='sm' className="bg-[#F9F8F9]">
            <figure className="w-full mx-auto">
                <Image src='/education.png' width={670} height={368} alt="inDrive Assistance" className="w-auto h-auto" />
            </figure>

            <div className="mt-3 flex items-center">
                <div className="mb-2 mr-4 leading-4">
                    <h4 className="text-sm font-semibold">Safety Education</h4>
                    <p className="text-xs">Play & Learn the basic survival skills of ridesharing</p>
                </div>

                <Button onClick={handleGoToEd} className="ml-auto shrink-0">
                    Play & Learn
                </Button>
            </div>
        </Box>
    )
}

export default PrecautionEducation;