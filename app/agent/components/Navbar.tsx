import Link from "next/link";
import { FC } from "react";

interface NavbarAgentProps {

}

const NavbarAgent: FC<NavbarAgentProps> = () => {
    return (
        <nav className="fixed top-0 left-0 w-full h-14 bg-neutral-950 text-sm text-neutral-500 flex items-center gap-8 px-6">
            <div>indrive team backend...</div>
            <Link href="/agent/sos" className="border-b border-secondary text-secondary">
                SOS - Emergencies
            </Link>
            <div>Other menu...</div>
        </nav>
    )
}

export default NavbarAgent;