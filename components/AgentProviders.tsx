'use client';

// React
import { FC } from "react";

// Providers
import { SessionProvider } from '@/context/SessionContext';
import { AgentSosProvider } from "@/context/AgentSosContext";




interface ProvidersProps {
    children: React.ReactNode;
}

const AgentProviders: FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionProvider>
            <AgentSosProvider>
                {children}
            </AgentSosProvider>
        </SessionProvider>
    );
}

export default AgentProviders;