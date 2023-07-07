import { Models } from "appwrite"
import { Role, Severity, Mood } from "./enums";
export type SosReq = Models.Document & {
    severity: Severity;
    initiator: string;
    initiator_name: string;
    initiator_phone: string;
    is_active: boolean
    can_speak: boolean;
    req_acknowledged: boolean;
    agent_informed_police: boolean;
    initiator_informed_police: boolean;
    initiator_informed_contacts: boolean;
}

export type SosMessage = Models.Document & {
    sos_related: string;
    sender: string;
    role: Role;
    message: string;
}

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

/**
 * Course & Quiz Schemas
 * 
 */

export type CourseSchema = {
    title: string;
    body: string;
    jsx?: boolean;
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