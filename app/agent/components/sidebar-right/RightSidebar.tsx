'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentSos } from "@/context/AgentSosContext";
import { FC, useEffect } from "react";
import PeopleDetails from "./PeopleDetails";
import { DescriptionList, DT, DD } from "@/components/ui/description-list";
import { SosReq } from "@/types/typings";

interface RightSidebarProps {
    sosData: SosReq | null
}

const RightSidebar: FC<RightSidebarProps> = ({ sosData }) => {


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


                    {/* Passenger Info */}
                    <PeopleDetails
                        title="Passenger Information"
                        name={sosData?.initiator_name || 'Fetching...'}
                        avatarUrl="https://api.multiavatar.com/dd.png"
                    >
                        <DescriptionList>
                            <div className="grid grid-cols-2 gap-y-3">
                                <div className=" col-span-2">
                                    <DT>Phone Number</DT>
                                    <DD>{sosData?.initiator_phone}</DD>
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

                </div>
            </ScrollArea>
        </aside>
    )
}

export default RightSidebar;