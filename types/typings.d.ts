import { Models } from "appwrite"
import { Severity } from "./enums";
export type SosReq = Models.Document & {
    severity: Severity;
    initiator: string;
    is_active: boolean
    can_speak: boolean;
    req_acknowledged: boolean;
    agent_informed_police: boolean;
    initiator_informed_police: boolean;
    initiator_informed_contacts: boolean;
}