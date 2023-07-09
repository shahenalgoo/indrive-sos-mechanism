'use client';

// React
import { FC, useState } from "react";
import { useRouter } from 'next/navigation';

// Components
import InputField from "@/components/form/InputField";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";

// Appwrite
import { account } from "@/lib/appwrite-config";




const AgentLogin: FC = () => {

    // States
    //
    const [email, setEmail] = useState<string>('agent1@indrive.com');
    const [password, setPassword] = useState<string>('12345678');


    // Hooks
    //
    const router = useRouter();


    // On Submit
    //
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await account.createEmailSession(email, password);
            router.push("/agent/sos");
        } catch (error) {
            console.log("Unable to login:", error);

        }
    }

    return (
        <Box variant='border' className="max-w-[360px] w-full">

            <h1 className="mb-4 text-center text-xl font-bold">InDrive Team</h1>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">

                <InputField
                    type='email'
                    defaultValue={email}
                    placeholder="Email address..."
                />

                <InputField
                    type='password'
                    defaultValue={password}
                    placeholder="Password..."
                />

                <Button variant='accent'>
                    Sign In
                </Button>

            </form>
        </Box>
    )
}

export default AgentLogin;