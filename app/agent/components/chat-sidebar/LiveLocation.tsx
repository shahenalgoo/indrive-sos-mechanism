import Box from "@/components/ui/box";
import Image from "next/image";
import { FC } from "react";

import { DescriptionList, DT, DD } from "@/components/ui/description-list";

interface LiveLocationProps {

}

const LiveLocation: FC<LiveLocationProps> = () => {
    return (
        <div>
            <h3 className="mb-2 text-xs font-semibold text-neutral-400">Live Location</h3>
            <Box space='sm' className="flex gap-4">

                <Image src="/map.jpg" width={100} height={100} alt="" className="border border-neutral-300 rounded-md grayscale" />

                <DescriptionList>
                    <DT>Street</DT>
                    <DD>201, East 125th Street</DD>

                    <DT>Neighbourhood</DT>
                    <DD>East Harlem</DD>

                    <DT>Suburb/City</DT>
                    <DD>Manhattan, City of New York</DD>

                    <DT>State/Region</DT>
                    <DD>New York</DD>

                    <DT>Coordinates</DT>
                    <DD>40.80419702317599, -73.9369810609215</DD>
                </DescriptionList>

            </Box>
        </div>
    )
}

export default LiveLocation;