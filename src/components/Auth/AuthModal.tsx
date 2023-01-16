import React, {ChangeEvent} from "react";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {authActions, TAuthModalType} from "../../store/auth/auth.slice";
import Box from "@mui/material/Box";
import {Button, Tab, Tabs, TextField} from "@mui/material";
import useAuth from "../../app/hooks/useAuth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import useAppDispatch from "../../app/hooks/useAppDispatch";

interface IAuthModalProps {
    onClose: () => void;
    setType: (type: TAuthModalType) => void;
    type: TAuthModalType;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -250px)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

const AuthModal = ({onClose, setType, type}: IAuthModalProps) => {
    const [form, setForm] = React.useState({
        login: {
            email: "", password: ""
        },
        reg: {
            email: "", password: "", confirm: ""
        }
    });
    const {auth, currentUser, isLoggedIn} = useAuth()
    const dispatch = useAppDispatch()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const [_type, name] = e.target.id.split("-") as ["login" | "reg", "email" | "password" | "confirm"];

        setForm((prev: typeof form) => ({
            ...prev,
            [_type]: {
                ...prev[_type],
                [name]: e.target.value
            }
        }));
    };

    const onLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, form.login.email, form.login.password);
            dispatch(authActions.setAuthModalType({type: false}))
            console.log('Success Sign IN')
            // routerNavigation("/dashboard");
        } catch (e) {
            console.log('FAIL Sign IN')
            const errorMessage = e.message;
            console.log(errorMessage)
            // setAuthErrorMessage(errorToMsg(errorMessage));
        }
    };

    const onSignUp = async () => {
        if (form.reg.password === form.reg.confirm) {

            try {
                await createUserWithEmailAndPassword(auth, form.reg.email, form.reg.password);
                dispatch(authActions.setAuthModalType({type: false}))
                console.log('Success Sign UP')
                // routerNavigation("/dashboard");
            } catch (e) {
                console.log('FAIL Sign UP')
                const errorMessage = e.message;
                console.log(errorMessage)
                // setAuthErrorMessage(errorToMsg(errorMessage));
            }
            // signUp({ password: form.reg.password, email: form.reg.email, username: form.reg.email });
        }
    };

    console.log(form[type === "registration" ? "reg" : "login"]);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={!!type}
            onClose={onClose}
            color="violet"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in>
                <AuthModalStyled>
                    <AuthModalStyled sx={style}>
                        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                            <Tabs value={type} onChange={(e, n) => setType(n)} aria-label="basic tabs example"
                                  color="violet"
                                // TabIndicatorProps={{
                                //   style: {
                                //     backgroundColor: "#BC00A3",
                                //     color: "#BC00A3"
                                //   }
                                // }}
                            >
                                <Tab value="login" label="Log In" color="violet"/>
                                <Tab value="registration" label="Sign Up" color="violet"/>
                            </Tabs>
                        </Box>

                        {type === "login" && <>
                            <AuthInput id="login-email" label="Email" variant="standard" onChange={onChange}
                                       color="violet"/>
                            <AuthInput id="login-password" label="Password" type="password" variant="standard"
                                       onChange={onChange} color="violet"/>
                            <AuthButton variant="contained" onClick={onLogin} color="violet">Log In</AuthButton>

                            {/*<div className="flex mt-5">*/}
                            {/*  <Typography id="transition-modal-title" variant="body1">Not a member?</Typography>*/}
                            {/*  <Typography id="transition-modal-title" variant="body1" className="cursor-pointer"*/}
                            {/*              style={{ color: "blue", marginLeft: 10 }}*/}
                            {/*              onClick={() => setType("registration")}>Sign Up</Typography>*/}
                            {/*</div>*/}
                        </>}

                        {type === "registration" && <>
                            <AuthInput id="reg-email" label="Email" variant="standard" onChange={onChange}
                                       color="violet"/>
                            <AuthInput id="reg-password" label="Password" type="password" variant="standard"
                                       color="violet"
                                       onChange={onChange}/>
                            <AuthInput id="reg-confirm" label="Confirm password" type="password" onChange={onChange}
                                       color="violet"
                                       variant="standard"/>
                            <AuthButton variant="contained" color="violet" onClick={onSignUp}>Sign Up</AuthButton>

                            {/*	<div className="flex mt-5">*/}
                            {/*		<Typography id="transition-modal-title" variant="body1" className="">Already have an*/}
                            {/*			account?</Typography>*/}
                            {/*		<Typography id="transition-modal-title" variant="body1" className="cursor-pointer"*/}
                            {/*					style={{ color: "blue", marginLeft: 10 }} onClick={() => setType("login")}>Log*/}
                            {/*			in</Typography>*/}
                            {/*	</div>*/}
                        </>}


                    </AuthModalStyled>
                </AuthModalStyled>
            </Fade>
        </Modal>
    );
};

const AuthButton = styled(Button)`
  width: 100%;
  margin-top: 25px !important;
`;

const AuthInput = styled(TextField)`
  margin-top: 20px !important;
  width: 100%;
`;

const AuthModalStyled = styled(Box)`
  .MuiTabs-indicator {
    background-color: #BC00A3;
    height: 3px;
  }

  .MuiTab-root.Mui-selected {
    color: #BC00A3;
  }
`;

export default (AuthModal);
