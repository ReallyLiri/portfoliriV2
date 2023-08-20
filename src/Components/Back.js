import MenuOption from "./MenuOption";
import navigationService from "../utils/navigationService";
import React from "react";
import FontAwesome from "react-fontawesome";

const Back = ({ isMobile, smartMobileClick }) => (
  <MenuOption
    smartMobileClick={smartMobileClick}
    isMobile={isMobile}
    onClick={() => navigationService.navigate("/")}
    text="Back"
  >
    <FontAwesome
      name="arrow-left"
      size={isMobile ? "1x" : "2x"}
      style={{ color: "white" }}
    />
  </MenuOption>
);

export default Back;
