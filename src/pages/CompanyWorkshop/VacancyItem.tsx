import React from 'react';
import styled from 'styled-components';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {IVacancy} from "../../store/user/user.types";
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface IVacancyItemProps {
    data: IVacancy
}

const VacancyItem: React.FC<IVacancyItemProps> = ({data: {title, description, locationType, tags, location}}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <VacancyItemStyled className="vacancy-item">
            <Card sx={{ minWidth: 300, border: "1px solid rgba(211,211,211,0.6)" }}>
                <CardHeader
                    title={title}
                    onClick={() => setOpen(!open)}
                    action={
                        <IconButton
                            onClick={() => setOpen(!open)}
                            aria-label="expand"
                            size="small"
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    }
                >
                </CardHeader>
                <div style={{ backgroundColor: 'rgb(45 45 45)'}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Container sx={{ height: 'auto', }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {`${locationType} / ${location}`}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Stack direction="row" spacing={1} className="mb-5 mt-2.5">
                                    {tags.map((i, idx) => (
                                        <Chip label={i} key={`${i}_&_${idx}`} color="primary" variant="outlined" />
                                    ))}
                                </Stack>
                                <Typography variant="body2" className={"whitespace-pre-wrap"}>
                                    {description}
                                </Typography>
                            </Container>
                        </CardContent>
                    </Collapse>
                </div>
            </Card>
        </VacancyItemStyled>
    )
};

const VacancyItemStyled = styled.div`
  .MuiPaper-root {
    border-radius: 0;
    border-color: #020202;
  }
`

export default (VacancyItem);
