import Box from "@/components/ui/box";
import { useUser } from "@/context/SessionContext";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TbLoader2 } from "react-icons/tb";
import { Mood } from "@/types/enums";
import { DD, DT, DescriptionList } from "@/components/ui/description-list";

const RideDetailsRider: FC = () => {

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

                <div className="text-sm leading-2">
                    <h4 className="font-bold">{user?.name || 'Fetching...'} - (Rider)</h4>
                    <span className="text-xs font-medium">Mood: {prefs.moodprefs.mood === Mood.neutral && Mood.neutral}</span>
                </div>
            </div>

            <DescriptionList>
                <div className="grid grid-cols-2 gap-y-3">
                    <div>
                        <DT>Safety Badge</DT>
                        <DD>{prefs.safety_badge ? 'Acquired' : 'Not yet'}</DD>
                    </div>
                    <div>
                        <DT>Conversations</DT>
                        <DD>{prefs.moodprefs.min_talk ? 'Keep minimal' : 'Open to'}</DD>
                    </div>
                    <div>
                        <DT>Music</DT>
                        <DD>{prefs.moodprefs.no_music ? "It's Okay" : 'Keep it down'}</DD>
                    </div>
                    <div>
                        <DT>Smoking</DT>
                        <DD>{prefs.moodprefs.no_smoking ? "It's Okay" : "Prefer not to"}</DD>
                    </div>
                </div>
            </DescriptionList>
        </Box>
    )
}

export default RideDetailsRider;