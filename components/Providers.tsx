'use client';

import { FC } from "react";
import { SessionProvider as SessionContextProvider } from '@/context/SessionContext';


interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionContextProvider>
            {children}
        </SessionContextProvider>
    );
}

export default Providers;