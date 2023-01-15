import React from 'react';
import styled from 'styled-components';

interface IMatchesPageProps {

}

const MatchesPage: React.FC<IMatchesPageProps> = ({}) => {
    return (
        <MatchesPageStyled>
            <h1>Matches page</h1>
        </MatchesPageStyled>
    )
};

const MatchesPageStyled = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #2d2d2d;
  padding-top: 80px;

  h1 {
    color: #fff;
  }
`

export default (MatchesPage);
