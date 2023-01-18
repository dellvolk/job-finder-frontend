import React from 'react';
import styled from 'styled-components';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {Autocomplete, Button, Chip, TextField, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Input from "../../components/Input";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {IVacancy, IVacancyDto, VacancyEntityLocationType} from "../../store/user/user.types";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -250px)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

interface IVacancyModalProps {
    open: boolean,
    onClose: () => void,
    submit: (data:IVacancyDto) => void,
    defaultValues?: IVacancy,
}

const VacancyModal: React.FC<IVacancyModalProps> = ({submit, defaultValues, open, onClose}) => {
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [data, setData] = React.useState<IVacancyDto>({
        title: '',
        description: '',
        tags: [],
        location: '',
        published: true,
        locationType: VacancyEntityLocationType.HYBRID
    })

    React.useEffect(() => {
        if (!!defaultValues) {
            const {id, ...other} = defaultValues
            setData(other)
        }
    }, [defaultValues])

    const onChange = (key: string, v: string) => setData(prev => ({...prev, [key]: v}))

    React.useEffect(() => {
        setErrorMessage(null)
    }, [data])

    const handleSubmit = () => {
        if (!data.title) {
            return setErrorMessage('Title is empty!')
        }

        if (!data.description) {
            return setErrorMessage('Description is empty!')
        }

        if (!data.tags || data?.tags.length === 0) {
            return setErrorMessage('Tags are empty!')
        }


        console.log('Submit', {data})
        submit(data)
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
                color="violet"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in>
                    <VacancyModalStyled>
                        <Box sx={style}>

                            <Typography variant="h4" gutterBottom>{!!defaultValues ? `Change vacancy` : 'Create vacancy'}</Typography>
                            {errorMessage && <Stack sx={{width: '100%', marginTop: 2, marginBottom: 2}} spacing={2}>
                                <Alert severity="error">{errorMessage}</Alert>
                            </Stack>}

                            <div className="row">
                                <div className="col-12">
                                    <Input
                                        label="Title"
                                        value={data.title}
                                        className="w-full"
                                        containerClasses="w-full mb-3.5"
                                        onChange={(e) => onChange('title', e)}
                                    />
                                </div>
                                <div className="col-12">
                                    <Input
                                        label="Description"
                                        value={data.description}
                                        className="w-full"
                                        containerClasses="w-full mb-3.5"
                                        onChange={(e) => onChange('description', e)}
                                        multiline
                                    />
                                </div>
                                <div className="col-12">
                                    <Autocomplete
                                        multiple
                                        id="tags-filled"
                                        options={[]}
                                        defaultValue={data.tags || []}
                                        freeSolo
                                        // @ts-ignore
                                        renderTags={(value: readonly string[], getTagProps) =>
                                            value.map((option: string, index: number) => (
                                                <Chip variant="outlined" label={option} {...getTagProps({index})} />
                                            ))
                                        }
                                        // @ts-ignore
                                        onChange={(e, v) => onChange('tags', v)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                color="violet"
                                                label="Skills"
                                                placeholder="Enter your skills"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-12 mt-5">
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label" color="secondary">Location type</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            color="secondary"
                                            value={data.locationType}
                                            onChange={(event, value) => onChange('locationType', value)}
                                        >
                                            <FormControlLabel value={VacancyEntityLocationType.HYBRID} control={<Radio />} label="Hybrid" />
                                            <FormControlLabel value={VacancyEntityLocationType.OFFICE} control={<Radio />} label="Office" />
                                            <FormControlLabel value={VacancyEntityLocationType.REMOTE} control={<Radio />} label="Remote" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="col-12">
                                    <Input
                                        label="Location"
                                        value={data.location}
                                        className="w-full"
                                        containerClasses="w-full mb-3.5"
                                        onChange={(e) => onChange('location', e)}
                                    />
                                </div>
                            </div>
                            <Button variant="contained" className="mt-7" onClick={handleSubmit} color="violet">{!!defaultValues ? 'Save changes' : 'Create vacancy'}</Button>

                        </Box>
                    </VacancyModalStyled>
                </Fade>
            </Modal>
        </>
    )
};

const VacancyModalStyled = styled(Box)`
`

export default (VacancyModal);
