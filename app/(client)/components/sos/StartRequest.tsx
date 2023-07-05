'use client';

// React
import { FC } from "react";

// Components
import { Button } from "@/components/ui/button";
import { TbArrowRight } from "react-icons/tb";


interface StartRequestProps {

}

const StartRequest: FC<StartRequestProps> = () => {
    return (
        <div className="mt-auto p-4 bg-neutral-100">

            <p className="mb-4 text-xs text-neutral-500 text-center">
                By using the button below, you agree to the <br />
                <a href="/ride" className="underline text-black font-bold">terms & conditions</a> of the inDrive SOS System.
            </p>

            <Button variant='accent' size='lg' className="w-full font-bold">
                Request Assistance
                <TbArrowRight size={20} strokeWidth={2} className="ml-2" />
            </Button>

        </div>
    );
}

export default StartRequest;