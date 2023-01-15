import React from "react"
import styled from "styled-components"
import HomeLanding from "./HomeLanding"
import History from "../../components/History"
import useAuth from "../../app/hooks/useAuth";

export default function Index() {
  const auth = useAuth()

	return (
		<IndexStyled>
			<HomeLanding />
      {auth && <>
        <History />
      </>}
		</IndexStyled>
	)
};

const IndexStyled = styled.div`
`
