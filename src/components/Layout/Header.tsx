import React from "react"
import styled from "styled-components"
import {Button, IconButton, Typography} from "@mui/material"
import useAppDispatch from "../../app/hooks/useAppDispatch"
import {setAuthModalType} from "../../store/auth/auth.slice"
import useAuth from "../../app/hooks/useAuth"
import {Link, NavLink} from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import {signOut} from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import useAppSelector from "../../app/hooks/useAppSelector";
import {selectUser} from "../../store/user/user.slice";
import {UserRole} from "../../store/user/user.types";

interface IHeaderProps {
    openSettings: () => void
}

const Header: React.FC<IHeaderProps> = ({openSettings}) => {
    const {auth, currentUser, isLoggedIn} = useAuth()
    const userInfo = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    console.log('HEADER', {auth, currentUser, isLoggedIn, userInfo})

    const openLoginModal = () => {
        dispatch(setAuthModalType({type: "login"}))
    }

    const openRegistrationModal = () => {
        dispatch(setAuthModalType({type: "registration"}))
    }

    const handleLogout = async () => {
        // dispatch(logout())
        try {
            await signOut(auth);
            // dispatch(authActions.setAuthModalType({type: false}))
            console.log('Success Logout')
            // routerNavigation("/dashboard");
        } catch (e) {
            console.log('FAIL logout')
            const errorMessage = e.message;
            console.log(errorMessage)
        }
    }

    console.log({auth})

    return (
        <HeaderStyled className="header">
            <div className="container">
                <div className="header__container">
                    <div className="nav-left-items">
                        <Link to={'/'}>
                            <Typography variant="h5" gutterBottom className="header__logo">
                                JOBS.FINDER
                            </Typography>
                        </Link>
                        {isLoggedIn && <ul className="nav-list">
                            <li><NavLink to={'/find'}>Find</NavLink></li>
                            <li><NavLink to={'/matches'}>Matches</NavLink></li>
                        </ul>}
                    </div>
                    <div className="header__auth">
                        {(isLoggedIn) ? <>
                            {/* TODO: Change after fix role on BE*/}
                            {(userInfo?.role === UserRole.COMPANY) && <Link to='/workshop'>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    // onClick={openSettings}
                                    edge="start"
                                    // href='/find'
                                    // sx={{ mr: 2, ...(open && { display: 'none' }) }}
                                >
                                    <HomeRepairServiceIcon/>
                                </IconButton>
                            </Link>}
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={openSettings}
                                edge="start"
                                className="mx-2.5"
                                // sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <SettingsIcon/>
                            </IconButton>
                            <IconButton
                                color="inherit"
                                // aria-label="open drawer"
                                onClick={handleLogout}
                                // edge="start"
                                // sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <LogoutIcon/>
                            </IconButton>
                            {/*<Button color="white" onClick={handleLogout}>Log Out</Button>*/}
                        </> : <>
                            <Button color="white" onClick={openLoginModal}>Log In</Button>
                            <Button color="white" variant="contained" onClick={openRegistrationModal}
                                    style={{marginLeft: 15}}>Sign Up</Button>
                        </>}
                        {/*<SignUpButton variant="contained" color="success">*/}
                        {/*	Sign up*/}
                        {/*</SignUpButton>*/}
                    </div>
                </div>
            </div>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.div`
  //box-shadow: none;
  backdrop-filter: blur(20px);
  min-height: 65px;
  //backdrop-filter: saturate(180%) blur(5px);
  //backface-visibility: hidden;
  //transform: translateZ(0px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  //justify-content: center;
  width: 100%;
  max-width: 100%;
  z-index: 101;
  box-shadow: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);
  transition: box-shadow 0.1s ease 0s, background-color 0.1s ease 0s;
  color: #fff;

  .nav-left-items {
    display: flex;

    ul {
      display: flex;
      align-items: center;
      margin-left: 100px;
      gap: 30px;

      a.active {
        color: #BC00A3;
      }
    }
  }

  .header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header__logo {
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 0;
  }

  .header__auth {

  }
`

export default (Header)
