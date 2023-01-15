import React from "react";
import styled from "styled-components";
import { useGetRealtyEstatesHistoryQuery, useLazyGetRealtyEstatesHistoryQuery } from "../../store/user/user.api";
import Card from "./Card";
import useAppSelector from "../../app/hooks/useAppSelector";

const Index = () => {
  const [getHistory, { data, isLoading, isError }] = useLazyGetRealtyEstatesHistoryQuery();
  const predict = useAppSelector(state => state.user.predictPrice)

  React.useEffect(() => {
    getHistory()
  }, [predict])

  return (
    <IndexStyled>
      <div className="container">
        <div className="row">
          {data?.map(i => (
            <Card {...i} />
          ))}
        </div>
      </div>
    </IndexStyled>
  );
};

const IndexStyled = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  gap: 10px;

  .row > div {
    margin-bottom: 20px;
  }
`;

export default (Index);
