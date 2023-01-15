import React from "react"
import styled from "styled-components"
import Header from "./Header"

interface ILayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {
    return (
        <LayoutStyled>
            <Header/>
            {children}
        </LayoutStyled>
    )
}

const LayoutStyled = styled.div`
`

export default Layout
