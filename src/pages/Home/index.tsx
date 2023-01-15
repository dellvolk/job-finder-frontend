import React from "react"
import styled from "styled-components"
import HomeLanding from "./HomeLanding"
import useAuth from "../../app/hooks/useAuth";

export default function Index() {
    const auth = useAuth()

    return (
        <IndexStyled>
            <HomeLanding/>
        </IndexStyled>
    )
};

const IndexStyled = styled.div`
`
