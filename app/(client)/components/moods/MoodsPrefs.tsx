'use client'

import { useUser } from "@/context/SessionContext";
import { Mood } from "@/types/enums";
import { MoodsPrefsType } from "@/types/typings";
import { FC, useEffect, useState } from "react";

interface MoodsPrefsProps {

}

const MoodsPrefs: FC<MoodsPrefsProps> = () => {

    // States
    const [moodPrefs, setMoodPrefs] = useState<MoodsPrefsType>(
        {
            mood: Mood.neutral,
            min_talk: false,
            no_music: false,
            no_smoking: false,
        }
    );

    // Hooks
    const { prefs, updatePrefs } = useUser();


    // UEF - set moodprefs
    useEffect(() => {
        setMoodPrefs(prefs.moodprefs);
    }, [prefs]);

    const savePrefs = () => {
        updatePrefs({ moodprefs: moodPrefs, safety_badge: prefs.safety_badge });
    }

    return (
        <>
            {/*  
                TODO:
                Mood switcher between Mood.neutral, Mood.happy, Mood.sad + update moodPrefs = setMoodPrefs({...moodPrefs, mood: Mood.neutral})
                Toggle for 'prefer minimum talk' + update moodPrefs = setMoodPrefs({...moodPrefs, min_talk: true/false})
                Toggle for 'prefer no music' + update moodPrefs = setMoodPrefs({...moodPrefs, no_music: true/false})
                Toggle for 'prefer no smoking' + update moodPrefs = setMoodPrefs({...moodPrefs, no_smoking: true/false})
                Save Changes button - use savePrefs()
            */}
        </>
    );
}

export default MoodsPrefs;