import React from "react";
import styled from "styled-components";
import background from "../../assets/main-background.jpg";
import {Typography} from "@mui/material";

const HomeLanding = () => {
  return (
    <HomeLandingStyled>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="mt-2">
              <Typography variant="h2" component="h2" className="text-white font-bold uppercase">Jobs Finder</Typography>
              <Typography variant="h4" component="h4" className="text-slate-300">Easily find employees or work</Typography>
            </div>
          </div>
          <div className="col-md-7">
            {/*<SearchForm />*/}
          </div>
        </div>
      </div>

    </HomeLandingStyled>
  );
};

const HomeLandingStyled = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;

  h2 {
    font-weight: 700 !important;
    white-space: nowrap;
  }

  .container {
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
      //background-image: url("${background}");
    //background-image: url("https://images.unsplash.com/photo-1647960792836-385e6daddfc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80");
    background-image: url("https://images.unsplash.com/photo-1654986966034-8f06a66f280a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80");
    //background-image: url("");
    background-position-x: center;
    background-position-y: bottom;
    //filter: grayscale(100%);
    //background-blend-mode: soft-light, multiply, normal;
    filter: brightness(0.25);
  }

  &:after {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    //background: linear-gradient(to left,rgba(255, 255, 255, 0.4) 0%, rgba(255, 0, 62, 0.9) 100%);
    //background: linear-gradient(to left,rgb(219, 88, 96) 0%, rgb(47, 207, 242) 100%);
    //mix-blend-mode: multiply;
    z-index: 1;
  }
`;

export default (HomeLanding);
