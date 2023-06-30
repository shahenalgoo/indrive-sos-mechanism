import { Models } from "appwrite"
import { Role, Severity } from "./enums";
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

export type SosMessage = Models.Document & {
    sos_related: string;
    sender: string;
    role: Role;
    message: string;
}