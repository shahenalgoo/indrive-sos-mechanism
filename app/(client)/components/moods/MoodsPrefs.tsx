'use client'

import { useUser } from "@/context/SessionContext";
import { account } from "@/lib/appwrite-config";
import { Mood } from "@/types/enums";
import { MoodsPrefs } from "@/types/typings";
import { FC, useCallback, useEffect, useState } from "react";

interface MoodsPrefsProps {

}

const MoodsPrefs: FC<MoodsPrefsProps> = () => {

    // States
    const [prefs, setPrefs] = useState<MoodsPrefs>(
        {
            mood: Mood.neutral,
            min_talk: false,
            no_music: false,
            no_smoking: false,
        }
    )

    const { isLoggedIn } = useUser();


    // Get user mood & preferences
    //
    const getPrefs = useCallback(async () => {

        try {
            const res: MoodsPrefs = await account.getPrefs();

            // Set prefs only if found
            if (JSON.stringify(res) !== "{}") {
                setPrefs(res);
            }

        } catch (error) {
            console.log(error);
        }

    }, []);


    // Set user mood & preferences
    //
    const updatePrefs = async () => {

        try {
            const res = await account.updatePrefs(prefs);
        } catch (error) {
            console.log(error);
        }

    }


    // UEF - Get prefs on init
    useEffect(() => {
        if (isLoggedIn) {
            getPrefs();
        }
    }, [getPrefs]);


    return (
        <>
            {/*  
                TODO:
                Mood switcher between Mood.neutral, Mood.happy, Mood.sad + update prefs = setPrefs({...prefs, mood: Mood.neutral})
                Toggle for 'prefer minimum talk' + update prefs = setPrefs({...prefs, min_talk: true/false})
                Toggle for 'prefer no music' + update prefs = setPrefs({...prefs, no_music: true/false})
                Toggle for 'prefer no smoking' + update prefs = setPrefs({...prefs, no_smoking: true/false})
                Save Changes button - use updatePrefs() 
            */}
        </>
    );
}

export default MoodsPrefs;