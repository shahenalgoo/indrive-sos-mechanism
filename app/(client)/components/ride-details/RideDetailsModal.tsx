'use client';

// React
import { FC } from "react";

// Libs
import { useGlobalState } from "@/lib/global-states";

// Ride Details
import RideDetailsModalHeader from "./RideDetailsModalHeader";
import RideDetailsRider from "./content/RideDetailsRider";
import RideDetailsDriver from "./content/RideDetailsDriver";




const RideDetailsModal: FC = () => {

    // States
    //
    const [rideDetailsModal] = useGlobalState('rideDetailsModal');

    return rideDetailsModal ? (
        <div className="sos-modal absolute top-0 left-0 z-40 w-full h-full flex flex-col bg-white text-black">

            <RideDetailsModalHeader />

            <div className="pt-16 px-4 flex flex-col gap-4">
                <RideDetailsDriver />
                <RideDetailsRider />
            </div>
        </div>
    ) : null
}

export default RideDetailsModal;