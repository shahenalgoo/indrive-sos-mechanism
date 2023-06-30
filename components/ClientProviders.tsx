'use client';

import { FC } from "react";
import { SessionProvider as SessionContextProvider } from '@/context/SessionContext';
import { SosReqProvider as SosReqContextProvider } from '@/context/SosReqContext';


interface ProvidersProps {
    children: React.ReactNode;
}

const ClientProviders: FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionContextProvider>
            <SosReqContextProvider>
                {children}
            </SosReqContextProvider>
        </SessionContextProvider>
    );
}

export default ClientProviders;