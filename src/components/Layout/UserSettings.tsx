import React from 'react';
import styled from 'styled-components';
import {stringAvatar, stringToColor} from '../../app/helpers';
import {useUserInfoQuery} from '../../store/user/user.api';
import {Autocomplete, Avatar, Badge, Button, Chip, Stack, TextField, Typography} from '@mui/material';
import useAppSelector from "../../app/hooks/useAppSelector";
import {selectUser} from "../../store/user/user.slice";
import {UserRole} from "../../store/user/user.types";
import Input from "../Input";
import EditIcon from '@mui/icons-material/Edit';

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
    // const user = useAppSelector(selectUser)

    // console.log({user})

    const [file, setFile] = React.useState<File | null>(null)
    const [data, setData] = React.useState<any>({
        username: 'Some username',
        description: "Some description",
        skills: ['React.JS', 'HTML', 'CSS3']
    });

    const user = {
        id: 0,
        email: 'testuser@mail.com',
        role: UserRole.DEVELOPER,
        firebaseUserId: 'dasojdioqwjiodjq',
    }

    if (!user) {
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

    console.log({file})

    const getAvatarProps = () => {
        const sx = {
            bgcolor: stringToColor(user.email),
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
            ...stringAvatar(user.email),
            sx
        }
    }

    const handleChange = (v: string | string[], key: string) => {
        setData(prev => ({...prev, [key]: v}));
    };

    const onSave = () => {
        console.log({data})
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
                    {user.email}
                </Typography>
            </Stack>
            <div className="mt-7">
                <div className="row">
                    <div className="col-10">
                        <Input value={data.username} onChange={v => handleChange(v, "username")} label={"Username"}/>
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
                    <div className="col-6 mt-10">
                        <Button color="white" variant="contained" disabled={false} onClick={onSave}>Save
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
