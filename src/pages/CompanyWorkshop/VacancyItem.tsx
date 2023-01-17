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

interface IVacancyItemProps {
    title: string,
    description: string
}

const VacancyItem: React.FC<IVacancyItemProps> = ({title, description}) => {
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
                <div style={{ backgroundColor: 'rgba(211,211,211,0.4)'}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Container sx={{ height: 'auto', }}>{description}</Container>
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
