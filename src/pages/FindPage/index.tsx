import React from 'react';
import styled from 'styled-components';

interface IFindPageProps {

}

const FindPage: React.FC<IFindPageProps> = ({}) => {
    return (
        <FindPageStyled>
            <h1>Find page</h1>
        </FindPageStyled>
    )
};

const FindPageStyled = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #2d2d2d;
  padding-top: 80px;
  
  h1 {
    color: #fff;
  }
`

export default (FindPage);
