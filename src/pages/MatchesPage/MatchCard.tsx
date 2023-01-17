import React from 'react';
import styled from 'styled-components';
import CardMui from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import {IDeveloperVacancy, UserRole} from "../../store/user/user.types";
import {stringAvatar, stringToColor} from "../../app/helpers";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Fab from '@mui/material/Fab';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NextPlanIcon from '@mui/icons-material/NextPlan';

interface IMatchCardProps {
    role: UserRole,
    data: IDeveloperVacancy,
}

const MatchCard: React.FC<IMatchCardProps> = ({data: {username, id, skills, location, description}, role}) => {
    return (
        <>
            <MatchCardStyled sx={{width: '100%'}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: stringToColor(username)}} aria-label="recipe">
                            {stringAvatar(username)?.children}
                        </Avatar>
                    }
                    title={username}
                    subheader={location}
                />
                <CardContent>
                    <Stack direction="row" spacing={1} className="mb-5">
                        {skills.map((i, idx) => (
                            <Chip label={i} key={`${i}_&_${idx}`} color="primary" variant="outlined"/>
                        ))}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" className="whitespace-pre-wrap">
                        {description}
                    </Typography>
                </CardContent>
            </MatchCardStyled>
        </>
    )
};

const MatchCardStyled = styled(CardMui)`
  padding: 20px;
  height: 100%;
`

export default (MatchCard);
