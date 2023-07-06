'use client';

// React
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import InputField from "@/components/form/InputField";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import { account } from "@/lib/appwrite-config";
import { useUser } from "@/context/SessionContext";


const ClientLogin: FC = () => {

    // States
    //
    const [email, setEmail] = useState<string>('passenger1@email.com');
    const [password, setPassword] = useState<string>('12345678');


    // Hooks
    //
    const router = useRouter();
    const { user, isLoggedIn, isLoading } = useUser();

    // On Submit
    //
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // await account.deleteSession('current');
            await account.createEmailSession(email, password);
            router.push("/ride");
        } catch (error) {
            console.log("Unable to login:", error);

        }
    }

    return (
        <Box variant='border' className="max-w-[360px] w-full">

            <h1 className="mb-4 text-center text-xl font-bold">Passenger Login</h1>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">

                <InputField
                    type='email'
                    defaultValue={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Email address..."
                />

                <InputField
                    type='password'
                    defaultValue={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Password..."
                />

                <Button variant='accent'>
                    Sign In
                </Button>
            </form>
        </Box>
    )
}

export default ClientLogin;