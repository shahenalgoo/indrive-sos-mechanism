// React
import { FC } from "react";

// Icons
import { Mood } from "@/types/enums";

// Components
import Box from "@/components/ui/box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DD, DT, DescriptionList } from "@/components/ui/description-list";

// Icons
import { TbCurrentLocation, TbLoader2 } from "react-icons/tb";

// Hooks
import { useUser } from "@/context/SessionContext";




const RideDetailsRider: FC = () => {

    // Hooks
    //
    const { user, prefs } = useUser();

    return (
        <Box variant='border' space='sm'>
            <div className="flex items-center gap-4 border-b border-border pb-2 mb-2">
                <Avatar>
                    <AvatarImage src="https://api.multiavatar.com/dd.png" />
                    <AvatarFallback>
                        <TbLoader2 className='animate-spin opacity-30' />
                    </AvatarFallback>
                </Avatar>

                <div className="text-sm leading-6">
                    <h4 className="font-bold">{user?.name || 'Fetching...'}</h4>
                    <p className="mb-1 text-xs font-medium">Mood: {prefs.moodprefs.mood === Mood.neutral && Mood.neutral}</p>
                    <p className="flex items-center text-xs font-medium text-blue-700">
                        <TbCurrentLocation className="animate-pulse mr-1" /> Is sharing live location
                    </p>
                </div>
            </div>

            <DescriptionList>
                <div className="grid grid-cols-2 gap-y-3">
                    <div>
                        <DT>Safety Badge</DT>
                        <DD>{prefs.safety_badge === true ? 'Acquired' : 'Not yet'}</DD>
                    </div>
                    <div>
                        <DT>Conversations</DT>
                        <DD>{prefs.moodprefs.min_talk === true ? 'Keep minimal' : 'Open to'}</DD>
                    </div>
                    <div>
                        <DT>Music</DT>
                        <DD>{prefs.moodprefs.no_music === true ? "It's Okay" : 'Keep it down'}</DD>
                    </div>
                    <div>
                        <DT>Smoking</DT>
                        <DD>{prefs.moodprefs.no_smoking === true ? "It's Okay" : "Prefer not to"}</DD>
                    </div>
                </div>
            </DescriptionList>
        </Box>
    )
}

export default RideDetailsRider;