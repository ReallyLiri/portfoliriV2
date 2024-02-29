import React, { useLayoutEffect, useState } from "react";
import MenuOption from "./MenuOption";
import navigationService from "../utils/navigationService";
import styled from "styled-components";
import _ from "lodash";

const StyledMenuOption = styled(MenuOption)`
  position: fixed;
  bottom: 20px;
  left: 0;
  top: unset;
`;

const StyledUp = styled.span`
  font-weight: bold;
  color: ${(props) => (props.invert ? "white" : "black")};
  font-size: ${(props) => (props.isMobile ? 16 : 32)}px;
  padding-bottom: ${(props) => (props.isMobile ? 2 : 8)}px;
`;

const ScrollToTop = ({ containerRef, isMobile, invert }) => {
  const [isScrolled, setScrolled] = useState(false);

  const offsetTop = _.get(containerRef, "current.offsetTop", 0);

  useLayoutEffect(() => {
    const onScroll = () => {
      setScrolled(window.pageYOffset > offsetTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [offsetTop, setScrolled]);

  return isScrolled ? (
    <StyledMenuOption
      circleColor={invert ? "black" : "white"}
      onClick={() => navigationService.scrollToTop(offsetTop)}
      text={"Back to top"}
      invertText
      isMobile={isMobile}
    >
      <StyledUp isMobile={isMobile} invert={invert}>
        ▲
      </StyledUp>
    </StyledMenuOption>
  ) : null;
};

export default ScrollToTop;
