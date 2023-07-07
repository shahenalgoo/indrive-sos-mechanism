import { FC } from "react";

interface DescriptionListProps {
    children: React.ReactNode;
}

const DescriptionList: FC<DescriptionListProps> = ({ children }) => {
    return (
        <dl className="text-sm">
            {children}
        </dl>
    )
}




interface DtProps {
    children: React.ReactNode;
}

const DT: FC<DtProps> = ({ children }) => {
    return (
        <dt className="text-xs text-neutral-600">{children}</dt>
    );
}




interface DdProps {
    children: React.ReactNode;
}

const DD: FC<DdProps> = ({ children }) => {
    return (
        <dd className="mb-2 last:mb-0 font-semibold">{children}</dd>
    );
}



export {
    DescriptionList,
    DT,
    DD
};