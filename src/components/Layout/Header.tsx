import React from "react"
import styled from "styled-components"
import {Button, Typography} from "@mui/material"
import useAppDispatch from "../../app/hooks/useAppDispatch"
import {logout, setAuthModalType} from "../../store/auth/auth.slice"
import useAuth from "../../app/hooks/useAuth"
import {Link, NavLink} from "react-router-dom";

const Header = () => {
    const auth = useAuth()
    const dispatch = useAppDispatch()

    const openLoginModal = () => {
        dispatch(setAuthModalType({type: "login"}))
    }

    const openRegistrationModal = () => {
        dispatch(setAuthModalType({type: "registration"}))
    }

    const handleLogout = () => {
        dispatch(logout())
    }

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
                        <ul className="nav-list">
                            <li><NavLink to={'/find'}>Find</NavLink></li>
                            <li><NavLink to={'/matches'}>Matches</NavLink></li>
                        </ul>
                    </div>
                    <div className="header__auth">
                        {auth ? <>
                            <Button color="white" onClick={handleLogout}>Log Out</Button>
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
    margin-bottom: 0px;
  }

  .header__auth {

  }
`

export default (Header)
