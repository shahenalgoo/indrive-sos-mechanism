import { useClientSos } from "@/context/ClientSosContext";
import { FC } from "react";
import { TbLoader2, TbUserShield } from "react-icons/tb";

const Acknowledgement: FC = () => {

    // Hooks
    //
    const { sosReq } = useClientSos();

    return (
        <div className={`py-1 px-2 rounded-md text-sm text-black font-medium ${sosReq?.req_acknowledged ? 'bg-secondary' : 'bg-orange-300'}`}>
            <div className="flex items-center gap-2">
                {!sosReq?.req_acknowledged && <TbLoader2 size={16} strokeWidth={2} className="animate-spin" />}
                {sosReq?.req_acknowledged && <TbUserShield size={16} strokeWidth={2} />}

                <span className="text-xs font-semibold">
                    {!sosReq?.req_acknowledged && `Awaiting response...`}
                    {sosReq?.req_acknowledged && `Agent Connected`}
                </span>
            </div>
        </div>
    )
}

export default Acknowledgement;