'use client';

// React
import { FC } from "react";

// Typings
import { SosReq } from "@/types/typings";

// Components
import { ScrollArea } from "@/components/ui/scroll-area";
import { DescriptionList, DT, DD } from "@/components/ui/description-list";

// Sidebar
import PeopleDetails from "./PeopleDetails";
import LiveLocation from "./LiveLocation";




interface RightSidebarProps {
    sosRequest: SosReq | null
}

const RightSidebar: FC<RightSidebarProps> = ({ sosRequest }) => {

    return (
        <aside className="left-sidebar shrink-0 w-[22rem] h-full border-l border-border">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-6 p-2 py-6">


                    {/* Driver Info */}
                    <PeopleDetails
                        title="Driver Information"
                        name="Johnny Vissente"
                        avatarUrl="https://github.com/shadcn.png"
                    >
                        <DescriptionList>
                            <div className="grid grid-cols-2 gap-y-3">
                                <div>
                                    <DT>Plate Number</DT>
                                    <DD>FRD 3568</DD>
                                </div>
                                <div>
                                    <DT>Car Make</DT>
                                    <DD>Ford Fiesta</DD>
                                </div>
                                <div>
                                    <DT>Car Color</DT>
                                    <DD>White</DD>
                                </div>
                                <div>
                                    <DT>Other</DT>
                                    <DD>...</DD>
                                </div>
                            </div>
                        </DescriptionList>
                    </PeopleDetails>


                    {/* Rider Info */}
                    <PeopleDetails
                        title="Rider Information"
                        name={sosRequest?.initiator_name || 'Fetching...'}
                        avatarUrl="https://api.multiavatar.com/dd.png"
                    >
                        <DescriptionList>
                            <div className="grid grid-cols-2 gap-y-3">
                                <div className=" col-span-2">
                                    <DT>Phone Number</DT>
                                    <DD>{sosRequest?.initiator_phone || 'Fetching...'}</DD>
                                </div>
                                <div>
                                    <DT>Emergency Contact</DT>
                                    <DD>Camelia</DD>
                                </div>
                                <div>
                                    <DT>Emergency Phone</DT>
                                    <DD>+5185836484</DD>
                                </div>
                            </div>
                        </DescriptionList>
                    </PeopleDetails>


                    {/* Live Location */}
                    <LiveLocation />

                </div>
            </ScrollArea>
        </aside>
    )
}

export default RightSidebar;