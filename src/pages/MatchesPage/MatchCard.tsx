import React from 'react';
import styled from 'styled-components';
import CardMui from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {IMatch, UserRole} from "../../store/user/user.types";
import {stringAvatar, stringToColor} from "../../app/helpers";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

interface IMatchCardProps {
    role: UserRole,
    data: IMatch,
}

const MatchCard: React.FC<IMatchCardProps> = ({data, role}) => {

    const {username, skills, location, description} = React.useMemo(() => {
        if (role === UserRole.COMPANY) {
            return {
                username: `${data.developer.firstName} ${data.developer.lastName}`,
                skills: data.developer.skills,
                location: data.developer.position,
                description: data.developer.description
            }
        }

        if (role === UserRole.DEVELOPER) {
            return {
                username: data.company.title,
                skills: data.vacancy?.tags,
                location: `${data.vacancy?.location} / ${data.vacancy?.locationType}`,
                description: data.company.description
            }
        }
    }, [role, data])

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
