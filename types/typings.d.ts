import { Models } from "appwrite"
import { Role, Mood } from "./enums";

/**
 * SOS Request & Messages Types
 * 
 */
export type SosReq = Models.Document & {
    initiator: string;
    initiator_name: string;
    initiator_phone: string;
    is_active: boolean
    can_speak: boolean;
    req_acknowledged: boolean;
    initiator_informed_police: boolean;
}

export type SosMessage = Models.Document & {
    sos_related: string;
    sender: string;
    role: Role;
    message: string;
}


/**
 * Course & Quiz Schemas
 * 
 */

export type CourseSchema = {
    title: string;
    body: string;
}

export type QuizSchema = {
    question: string;
    options: string[];
    correct_answer: number;
}

export type CourseAndQuizSchema = {
    course?: CourseSchema;
    quiz?: QuizSchema;
}


/**
 * Mood & Preferences
 * 
 */

export type MoodsPrefsType = {
    mood: Mood,
    min_talk: boolean,
    no_music: boolean,
    no_smoking: boolean,
}

export type UserPref = {
    moodprefs: MoodsPrefs,
    safety_badge: boolean
}