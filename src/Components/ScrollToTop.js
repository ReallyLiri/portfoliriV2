import React, {useLayoutEffect, useState} from "react";
import MenuOption from "./MenuOption";
import navigationService from "../utils/navigationService";
import styled from "styled-components/macro";
import _ from "lodash"

const StyledMenuOption = styled(MenuOption)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  top: unset;
`

const StyledUp = styled.span`
  font-weight: bold;
  color: black;
  font-size: 32px;
  padding-bottom: 8px;
`

const ScrollToTop = ({containerRef}) => {

    const [isScrolled, setScrolled] = useState(false);

    const offsetTop = _.get(containerRef, "current.offsetTop", 0);

    useLayoutEffect(() => {
        const onScroll = () => {
            setScrolled(window.pageYOffset > offsetTop)
        }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [offsetTop, setScrolled])

    return isScrolled
        ? <StyledMenuOption circleColor="white" onClick={() => navigationService.scrollToTop(offsetTop)} text={"Back to top"} invertText>
            <StyledUp>▲</StyledUp>
        </StyledMenuOption>
        : null
}

export default ScrollToTop
