'use client';

// React
import { FC, MouseEventHandler } from "react";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { TbAddressBook, TbChevronRight, TbCurrentLocation, TbMicrophone, TbMoodSmile, TbUserCheck } from "react-icons/tb";




const PrecautionOptions: FC = () => {

    return (
        <div className="mt-8">
            <Item
                icon={<TbMoodSmile size={24} strokeWidth={1} />}
                title="Mood & Preferences"
            />

            <div className="my-2 w-full h-[1px] bg-border" />

            <Item
                icon={<TbUserCheck size={24} strokeWidth={1} />}
                title="Ride Authentication"
            />

            <div className="my-2 w-full h-[1px] bg-border" />

            <Item
                icon={<TbAddressBook size={24} strokeWidth={1} />}
                title="Trusted Contact"
            />

            <div className="my-2 w-full h-[1px] bg-border" />

            <Item
                icon={<TbCurrentLocation size={24} strokeWidth={1} />}
                title="Share Live Location"
            />

            <div className="my-2 w-full h-[1px] bg-border" />

            <Item
                icon={<TbMicrophone size={24} strokeWidth={1} />}
                title="Record Audio"
            />
        </div>
    )
}

export default PrecautionOptions;


interface ItemProps {
    icon: any;
    title: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Item: FC<ItemProps> = ({ icon, title, onClick }) => {
    return (
        <Button onClick={onClick} variant='ghost' size='lg' className="w-full justify-start px-0 hover:bg-transparent">
            <span className="mr-4">{icon}</span>
            <span>{title}</span>
            <TbChevronRight className="ml-auto" />
        </Button>
    )
}