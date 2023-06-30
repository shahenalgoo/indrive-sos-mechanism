'use client';

import { FC } from "react";
import { SessionProvider as SessionContextProvider } from '@/context/SessionContext';
import { SosRequestsProvider as SosRequestsContextProvider } from "@/context/AgentSosContext";

interface ProvidersProps {
    children: React.ReactNode;
}

const AgentProviders: FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionContextProvider>
            <SosRequestsContextProvider>
                {children}
            </SosRequestsContextProvider>
        </SessionContextProvider>
    );
}

export default AgentProviders;