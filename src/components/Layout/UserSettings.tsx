import React from 'react';
import styled from 'styled-components';
import {stringAvatar, stringToColor} from '../../app/helpers';
import {Autocomplete, Avatar, Badge, Button, Chip, Stack, TextField, Typography} from '@mui/material';
import {ICompany, IDeveloper, isCompany, isDeveloper, UserRole} from "../../store/user/user.types";
import Input from "../Input";
import EditIcon from '@mui/icons-material/Edit';
import useAppSelector from '../../app/hooks/useAppSelector';
import {selectUser} from '../../store/user/user.slice';
import {useUpdateCompanyInfoMutation, useUpdateDeveloperInfoMutation} from "../../store/user/user.api";

const fileTypes = [
    // "image/apng",
    // "image/bmp",
    // "image/gif",
    "image/jpeg",
    // "image/pjpeg",
    "image/png",
    // "image/svg+xml",
    // "image/tiff",
    "image/webp",
    // "image/x-icon"
];

function validFileType(file: File) {
    return fileTypes.includes(file.type);
}

interface IUserSettingsProps {

}

const UserSettings: React.FC<IUserSettingsProps> = ({}) => {
    const inputRef = React.useRef<HTMLInputElement>()
    const userInfo = useAppSelector(selectUser)

    // console.log({user})

    const [file, setFile] = React.useState<File | null>(null)
    const [data, setData] = React.useState<any>(null);
    const [updateDeveloper, { isLoading: isLoadingUpdateDeveloper }] = useUpdateDeveloperInfoMutation()
    const [updateCompany, {isLoading: isLoadingUpdateCompany}] = useUpdateCompanyInfoMutation()

    React.useEffect(() => {
        if (!userInfo) return void 0;

        setData(() => {
            if (isDeveloper(userInfo)) {
                return {
                    description: userInfo.description,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    position: userInfo.position,
                    skills: userInfo.skills,
                }
            }

            if (isCompany(userInfo)) {
                return {
                    description: userInfo.description,
                    title: userInfo.title,
                }
            }
        })
    }, [userInfo])

    if (!userInfo || !data) {
        return <UserSettingsStyled>
            Loading...
        </UserSettingsStyled>
    }

    const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.length === 1) {
            const file = e.target.files[0];
            if (!validFileType(file)) return void 0;
            // console.log(file)
            setFile(file)
        }
    }

    const openFileManager = () => {
        if (!inputRef.current) return void 0;
        inputRef.current.click()
    }

    const getAvatarProps = () => {
        const sx = {
            bgcolor: stringToColor(userInfo.owner.email),
            width: 60,
            height: 60,
        }

        if (file) {
            return {
                sx: {
                    ...sx,
                    bgcolor: 'transparent'
                },
                alt: 'profile-avatar',
                src: URL.createObjectURL(file)
            }
        }

        return {
            ...stringAvatar(userInfo.owner.email),
            sx
        }
    }

    const handleChange = (v: string | string[], key: string) => {
        setData(prev => ({...prev, [key]: v}));
    };

    const onSave = () => {
        console.log({data})
        if (isDeveloper(userInfo)) {
            updateDeveloper({...userInfo, ...data})
        }

        if (isCompany(userInfo)) {
            updateCompany({...userInfo, ...data})
        }
    }


    return (
        <UserSettingsStyled>
            <h1 className="uppercase mb-8">User settings</h1>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Badge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    badgeContent={
                        <Stack bgcolor={"#BC00A3"} style={{borderRadius: '50%', padding: 5}} onClick={openFileManager}>
                            <EditIcon style={{width: 14, height: 14}} />
                        </Stack>
                    }
                >
                    <Avatar {...getAvatarProps()} onClick={openFileManager}/>
                </Badge>
                <input ref={inputRef} type="file" className="hidden" onChange={onChangePhoto}/>
                <Typography variant="h5" gutterBottom>
                    {userInfo.owner.email}
                </Typography>
            </Stack>
            <div className="mt-7">
                <div className="row">
                    {isDeveloper(userInfo) && <>
                        <div className="col-5">
                            <Input value={data.firstName} onChange={v => handleChange(v, "firstName")} label={"First Name"}/>
                        </div>
                        <div className="col-5">
                            <Input value={data.lastName} onChange={v => handleChange(v, "lastName")} label={"Last Name"}/>
                        </div>
                        <div className="col-10 mt-5">
                            <Input value={data.position} onChange={v => handleChange(v, "position")} label={"Position"}/>
                        </div>
                        <div className="col-10 mt-5">
                            <Input
                                value={data.description}
                                onChange={v => handleChange(v, "description")}
                                label={"Description"}
                                multiline
                                // minRows={4}
                            />
                        </div>
                        <div className="col-10 mt-5">
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={[]}
                                defaultValue={data.skills || []}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({index})} />
                                    ))
                                }
                                onChange={(v, e) => handleChange(e, 'skills')}
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
                    </>}

                    {isCompany(userInfo) && <>
                        <div className="col-10">
                            <Input value={data.title} onChange={v => handleChange(v, "title")} label={"Company name"}/>
                        </div>
                        <div className="col-10 mt-5">
                            <Input
                                value={data.description}
                                onChange={v => handleChange(v, "description")}
                                label={"Description"}
                                multiline
                                // minRows={4}
                            />
                        </div>
                    </>}

                    <div className="col-6 mt-10">
                        <Button color="white" variant="contained" disabled={isLoadingUpdateCompany || isLoadingUpdateDeveloper} onClick={onSave}>Save
                            changes</Button>
                    </div>
                </div>
            </div>
        </UserSettingsStyled>
    )
};

const UserSettingsStyled = styled.div`
  min-width: 500px;
  max-width: 500px;
  padding: 50px 30px;

  .MuiFormControl-root {
    width: 100% !important;
  }
`

export default (UserSettings);
