import styled from "styled-components/macro";
import MenuOption from "./MenuOption";
import navigationService from "../utils/navigationService";
import React from "react";

const StyledArrow = styled.span`
  font-weight: bold;
  color: white;
  font-size: ${props => props.isMobile ? 32 : 42}px;
`

const Back = ({isMobile}) =>  <MenuOption isMobile={isMobile} onClick={() => navigationService.navigate("/")} text="Back">
    <StyledArrow isMobile={isMobile}>🠔</StyledArrow>
</MenuOption>

export default Back
