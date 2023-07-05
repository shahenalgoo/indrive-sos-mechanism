
import { FC } from "react";
import Box from "@/components/ui/box";
import { Tb24Hours, TbHeartHandshake, TbMessageExclamation, TbSos } from "react-icons/tb";
import { PiSirenThin } from "react-icons/pi";


const BenefitsCard: FC = () => {
    return (
        <div className="px-6 my-auto flex-1 flex flex-col justify-center">
            <Item icon={<Tb24Hours size={26} strokeWidth={1} />} value="An inDrive Safety Agent will receive a detailed notification upon your request." />
            <Item icon={<TbHeartHandshake size={26} strokeWidth={1} />} value="We will call you, or you have the option to chat if unable to speak.." />
            <Item icon={<PiSirenThin size={26} strokeWidth={1} />} value="We will notify emergency services on your behalf if necessary. Alternative emergency options will also be available" />
        </div>
    )
}

export default BenefitsCard;


interface ItemProps {
    icon: any;
    value: string;
}

const Item: FC<ItemProps> = ({ icon, value }) => {
    return (
        <div className="py-5 flex items-center border-b border-border last:border-none">
            <div className="shrink-0 mr-4">
                {icon}
            </div>
            <p className="text-sm leading-5">
                {value}
            </p>
        </div>
    )
}