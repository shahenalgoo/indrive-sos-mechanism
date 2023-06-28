'use client';

import { Button } from "@/components/ui/button";
import { setGlobalState, useGlobalState } from "@/lib/global-states";
import { FC } from "react";


const RideTriggers: FC = () => {

    const [sosModal] = useGlobalState('sosModal');


    return (
        <>
            <Button onClick={() => setGlobalState('sosModal', !sosModal)}>
                SOS {String(sosModal)}
            </Button>
        </>
    );
}

export default RideTriggers;