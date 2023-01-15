import React from "react"
import styled from "styled-components"
import Header from "./Header"

interface ILayoutProps {
	children: React.ReactNode
}

export default function Home({ children }: ILayoutProps) {
	return (
		<IndexStyled>
			<Header />
			{children}
		</IndexStyled>
	)
}

const IndexStyled = styled.div`
`
