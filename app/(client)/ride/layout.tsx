import { FC } from "react";
import CheckUser from "../components/CheckUser";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <CheckUser>
                {children}
            </CheckUser>
        </>
    )
}

export default Layout;