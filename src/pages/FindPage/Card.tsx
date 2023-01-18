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
import {IDeveloperVacancy, ISearch, isSearchDeveloper, isSearchVacancy, UserRole} from "../../store/user/user.types";
import {stringAvatar, stringToColor} from "../../app/helpers";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Fab from '@mui/material/Fab';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NextPlanIcon from '@mui/icons-material/NextPlan';

interface ICardProps {
    role: UserRole,
    data: ISearch,
    onLike: () => void
    onDislike: () => void
    onSkip: () => void
}

const Card: React.FC<ICardProps> = ({data:_data, onLike, onSkip, onDislike, role}) => {
    const [data, setData] = React.useState(null)
    const isVacancy = isSearchVacancy(_data)
    const isDeveloper = isSearchDeveloper(_data)

    if (isSearchDeveloper(_data)) {
        console.log(_data)
    }

    React.useEffect(() => {
        setData(() => {
            if (isSearchVacancy(_data)) {
                return {
                    title: _data.data.title,
                    description: _data.data.description,
                    location: _data.data.location,
                    locationType: _data.data.locationType,
                    tags: _data.data.tags
                }
            }

            if (isSearchDeveloper(_data)) {
                return {
                    title: `${_data.data.firstName} ${_data.data.lastName}`,
                    description: _data.data.description,
                    position: _data.data.position,
                    locationType: '',
                    tags: _data.data.skills
                }
            }
        })
    }, [_data])

    if (!data) return <></>

    const {title, description, location, locationType, tags, position} = data

    return (
        <>
            <CardStyled sx={{ width: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: stringToColor(title) }} aria-label="recipe">
                            {stringAvatar(title)?.children}
                        </Avatar>
                    }
                    title={title}
                    subheader={position || `${location} / ${locationType}`}
                />
                <CardContent>
                    <Stack direction="row" spacing={1} className="mb-5">
                        {tags.map((i, idx) => (
                            <Chip label={i} key={`${i}_&_${idx}`} color="primary" variant="outlined" />
                        ))}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" className="whitespace-pre-wrap">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className="">
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
