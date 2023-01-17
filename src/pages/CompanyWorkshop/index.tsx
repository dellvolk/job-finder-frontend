import React from 'react';
import styled from 'styled-components';
import useAppSelector from "../../app/hooks/useAppSelector";
import {selectUser} from "../../store/user/user.slice";
import {Navigate} from "react-router-dom";
import {IVacancy, UserRole} from "../../store/user/user.types";
import VacancyItem from "./VacancyItem";
import VacancyModal from "./VacancyModal";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ICompanyWorkshopProps {

}

const CompanyWorkshop: React.FC<ICompanyWorkshopProps> = ({}) => {
    const userInfo = useAppSelector(selectUser)
    const [open, setOpen] = React.useState<boolean>(false)

    if (!userInfo) {
        return <></>
    }

    if (false && userInfo.role !== UserRole.COMPANY) {
        return <Navigate to={'/'}/>
    }

    const data = [
        {
            title: 'First item', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?'
        },
        {
            title: 'Second item', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?'
        },
        {
            title: '3 item', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?'
        },
        {
            title: '4 item', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?'
        },
        {
            title: '5 item', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloribus esse et nihil optio quibusdam quisquam repudiandae sequi. Expedita fugit laborum molestias nobis, provident sapiente voluptate. Accusamus consequuntur cumque deleniti earum expedita id libero modi molestiae mollitia natus perspiciatis praesentium, quasi quos reprehenderit sint sit sunt temporibus ullam velit, voluptatem?'
        },
    ]

    const handleAdd = (data:IVacancy) => {
        console.log('Create', {data})
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
                            <VacancyItem title={i.title} description={i.description} />
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
