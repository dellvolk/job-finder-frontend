import React from 'react';
import styled from 'styled-components';
import Typography from "@mui/material/Typography";
import vanila_data from "../FindPage/data";
import MatchCard from "./MatchCard";
import useAppSelector from "../../app/hooks/useAppSelector";
import {selectUser} from "../../store/user/user.slice";

interface IMatchesPageProps {

}

const MatchesPage: React.FC<IMatchesPageProps> = ({}) => {
    const userInfo = useAppSelector(selectUser)

    const data = vanila_data

    if (!userInfo) return <></>
    return (
        <MatchesPageStyled className="mt-10">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 ">
                        <Typography variant="h5" gutterBottom className="mb-5 uppercase">
                            {`List of matches`}
                        </Typography>
                    </div>
                </div>
                <div className="row">
                    {data.map(i => (
                        <div className="col-12 col-md-6 mb-3.5" key={i.id}>
                            <MatchCard role={userInfo.role} data={i}/>
                        </div>
                    ))}
                </div>
            </div>
        </MatchesPageStyled>
    )
};

const MatchesPageStyled = styled.div`
  background-color: #2d2d2d;
  padding-top: 80px;

  h1 {
    color: #fff;
  }
`

export default (MatchesPage);
