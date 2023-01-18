import React from 'react';
import styled from 'styled-components';
import useAppSelector from "../../app/hooks/useAppSelector";
import {selectUser} from "../../store/user/user.slice";
import {Navigate} from "react-router-dom";
import {IVacancy, IVacancyDto, UserRole} from "../../store/user/user.types";
import VacancyItem from "./VacancyItem";
import VacancyModal from "./VacancyModal";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useAddVacancyMutation, useGetVacanciesQuery, useLazyGetVacanciesQuery} from "../../store/user/user.api";

interface ICompanyWorkshopProps {

}

const CompanyWorkshop: React.FC<ICompanyWorkshopProps> = ({}) => {
    const userInfo = useAppSelector(selectUser)
    const [open, setOpen] = React.useState<boolean>(false)
    console.log('fetch')
    const [fetchVacancies, {data}] = useLazyGetVacanciesQuery()
    const [addVacancy, {isSuccess: isSuccessAdded}] = useAddVacancyMutation()

    React.useEffect(() => {
        if (isSuccessAdded) {
            setOpen(false)
        }
    }, [isSuccessAdded])

    React.useEffect(() => {
        if (userInfo) {
            fetchVacancies()
        }
    }, [userInfo])

    if (!userInfo || !data) {
        return <></>
    }

    if (userInfo.owner.role !== UserRole.COMPANY) {
        return <Navigate to={'/'}/>
    }

    const handleAdd = (data:IVacancyDto) => {
        addVacancy(data)
    }

    return (
        <CompanyWorkshopStyled>
            <div className="container">
                <div className="row justify-center mt-10 vacancies-container">
                    <div className="col-12 col-md-8 mb-5">
                        <Fab variant="extended" color="secondary" aria-label="edit" onClick={() => setOpen(true)}>
                            <AddIcon  sx={{ mr: 1, fill: '#000' }} />
                            Navigate
                        </Fab>
                    </div>
                    {data.map((i, idx) => (
                        <div className="col-12 col-md-8" key={i.title + i.description + idx}>
                            <VacancyItem data={i} />
                        </div>
                    ))}
                </div>
            </div>
            {open && <VacancyModal submit={handleAdd} open={open} onClose={() => setOpen(false)}/>}
        </CompanyWorkshopStyled>
    )
};

const CompanyWorkshopStyled = styled.div`
  min-height: 100vh;
  //width: 100vw;
  padding: 80px 0;
  
  .vacancies-container {
    
    //&:first-child {
    //}
    
    &>div:first-child .MuiPaper-root  {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    &>div:last-child .MuiPaper-root {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`

export default (CompanyWorkshop);
