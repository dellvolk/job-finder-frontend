import { Drawer } from "@mui/material";
import React from "react"
import styled from "styled-components"
import Header from "./Header"
import UserSettings from "./UserSettings";

interface ILayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {
    const [isOpenSettings, setIsOpenSettings] = React.useState<boolean>(false)

    return (
        <LayoutStyled>
            <Header openSettings={() => setIsOpenSettings(true)}/>
            {children}
            <Drawer
                anchor={'right'}
                open={isOpenSettings}
                onClose={() => setIsOpenSettings(false)}
            >
                <UserSettings />
            </Drawer>
        </LayoutStyled>
    )
}

const LayoutStyled = styled.div`
`

export default Layout
