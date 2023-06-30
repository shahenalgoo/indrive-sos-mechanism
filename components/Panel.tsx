import { cn } from "@/lib/override-classes";
import { FC, HTMLAttributes } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> { }

const Panel: FC<PanelProps> = ({ className, children, ...props }) => {
    return (
        <div {...props} className={cn(`w-full h-auto bg-white text-black py-8 px-6 rounded-tl-3xl rounded-tr-3xl ${className}`)}>
            {children}
        </div>
    );
}

export default Panel;