'use client';

// React
import { FC } from "react";

// Providers
import { SessionProvider } from '@/context/SessionContext';
import { ClientSosProvider } from '@/context/ClientSosContext';




interface ProvidersProps {
    children: React.ReactNode;
}

const ClientProviders: FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionProvider>
            <ClientSosProvider>
                {children}
            </ClientSosProvider>
        </SessionProvider>
    );
}

export default ClientProviders;