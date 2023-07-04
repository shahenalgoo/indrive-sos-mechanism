'use client';

import { FC } from "react";
import { SessionProvider as SessionContextProvider } from '@/context/SessionContext';
import { AgentSosProvider } from "@/context/AgentSosContext";

interface ProvidersProps {
    children: React.ReactNode;
}

const AgentProviders: FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionContextProvider>
            <AgentSosProvider>
                {children}
            </AgentSosProvider>
        </SessionContextProvider>
    );
}

export default AgentProviders;