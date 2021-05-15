import styled from "styled-components/macro";
import MenuOption from "./MenuOption";
import navigationService from "../utils/navigationService";
import React from "react";

const StyledArrow = styled.span`
  font-weight: bold;
  color: white;
  font-size: 42px;
`

const Back = () =>  <MenuOption onClick={() => navigationService.navigate("/")} text="Back">
    <StyledArrow>🠔</StyledArrow>
</MenuOption>

export default Back
