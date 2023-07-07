import Box from "@/components/ui/box";
import { FC } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TbLoader2 } from "react-icons/tb";


interface PeopleDetailsProps {
    children: React.ReactNode;
    title: string;
    name: string;
    avatarUrl: string;
}

const PeopleDetails: FC<PeopleDetailsProps> = ({ children, title, name, avatarUrl }) => {
    return (
        <div>
            <h3 className="mb-2 text-xs font-semibold text-neutral-400">{title}</h3>
            <Box variant='border' space='sm' className="">
                <div className="mb-3 flex items-center gap-4 pb-2 border-b border-border">
                    <Avatar>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>
                            <TbLoader2 className='animate-spin opacity-30' />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="mb-1 text-sm font-bold">{name}</h4>
                        <Button size='sm' variant='default'>
                            View Profile
                        </Button>
                    </div>
                </div>
                {children}
            </Box>
        </div>
    )
}

export default PeopleDetails;