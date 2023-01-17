import React from 'react';
import styled from 'styled-components';
import CardMui from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
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

interface ICardProps {
    role: UserRole,
    data: IDeveloperVacancy,
    onLike: () => void
    onDislike: () => void
    onSkip: () => void
}

const Card: React.FC<ICardProps> = ({data: {username, id, skills, location, description}, onLike, onSkip, onDislike, role}) => {
    return (
        <>
            <CardStyled sx={{ width: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: stringToColor(username) }} aria-label="recipe">
                            {stringAvatar(username)?.children}
                        </Avatar>
                    }
                    title={username}
                    subheader={location}
                />
                <CardContent>
                    <Stack direction="row" spacing={1} className="mb-5">
                        {skills.map((i, idx) => (
                            <Chip label={i} key={`${i}_&_${idx}`} color="primary" variant="outlined" />
                        ))}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" className="whitespace-pre-wrap">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className="">
                    {/*<IconButton aria-label="add to favorites">*/}
                    {/*    <FavoriteIcon />*/}
                    {/*</IconButton>*/}
                    {/*<IconButton aria-label="share">*/}
                    {/*    <ShareIcon />*/}
                    {/*</IconButton>*/}
                    <Fab variant="extended" color="secondary" style={{color: '#fff'}} onClick={onDislike}>
                        <ThumbDownIcon sx={{ mr: 1 }} />
                        Dislike
                    </Fab>
                    <Fab variant="extended" className="mx-5" style={{color: '#2d2d2d'}} onClick={onSkip}>
                        <NextPlanIcon sx={{ mr: 1, fill: '#2d2d2d' }} />
                        Skip
                    </Fab>
                    <Fab variant="extended" color="success" style={{color: '#fff'}} onClick={onLike}>
                        <ThumbUpIcon sx={{ mr: 1 }} />
                        Like
                    </Fab>
                </CardActions>
            </CardStyled>
        </>
    )
};

const CardStyled = styled(CardMui)`
    padding: 20px;
`

export default (Card);
