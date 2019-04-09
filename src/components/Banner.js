import React from "react";
import styled from "@emotion/styled";
import BannerSplash from "../assets/splash.png";
import { withTheme } from "emotion-theming";

const Splash = styled.div`
  background-image: url(${BannerSplash});
  min-height: 400px;
  background-size: cover;
  position: relative;
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: "Cabin Condensed", "georgia", sans-serif;
    color: ${props => props.theme.colors.white};
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const Banner = props => (
  <Splash {...props}>
    <h1>See You Later, WoW Passport</h1>
  </Splash>
);

export default withTheme(Banner);
