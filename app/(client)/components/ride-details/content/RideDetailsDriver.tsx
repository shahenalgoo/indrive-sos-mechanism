// React
import { FC } from "react";

// Components
import Box from "@/components/ui/box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DD, DT, DescriptionList } from "@/components/ui/description-list";

// Icons
import { TbCircleCheckFilled, TbLoader2 } from "react-icons/tb";




const RideDetailsDriver: FC = () => {

    return (
        <Box variant='border' space='sm'>
            <div className="flex items-center gap-4 border-b border-border pb-2 mb-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                        <TbLoader2 className='animate-spin opacity-30' />
                    </AvatarFallback>
                </Avatar>

                <div className="text-sm leading-2">
                    <h4 className="font-bold flex items-center gap-1">
                        Johnny Vissente <TbCircleCheckFilled size={18} className='text-blue-500' />
                    </h4>
                    <span className="text-xs font-medium">Mood: Happy</span>
                </div>
            </div>

            <DescriptionList>
                <div className="grid grid-cols-2 gap-y-3">
                    <div>
                        <DT>Safety Badge</DT>
                        <DD>Acquired</DD>
                    </div>
                    <div>
                        <DT>Conversations</DT>
                        <DD>Open to</DD>
                    </div>
                    <div>
                        <DT>Music</DT>
                        <DD>It&apos;s Okay</DD>
                    </div>
                    <div>
                        <DT>Smoking</DT>
                        <DD>No</DD>
                    </div>
                </div>
            </DescriptionList>
        </Box>
    )
}

export default RideDetailsDriver;