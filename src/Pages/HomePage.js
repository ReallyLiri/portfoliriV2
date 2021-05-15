import React, {useEffect, useState} from "react"
import styled from "styled-components/macro";
import navigationService from "../utils/navigationService";
import {ReactComponent as Art} from "../assets/art.svg"
import {ReactComponent as Book} from "../assets/book.svg"
import {ReactComponent as Github} from "../assets/github.svg"
import {ReactComponent as Keyboard} from "../assets/keyboard.svg"
import {ReactComponent as Mobile} from "../assets/mobile.svg"
import {ReactComponent as Stackoverflow} from "../assets/stackoverflow.svg"
import {ReactComponent as Gmail} from "../assets/gmail.svg"
import {ReactComponent as Card} from "../assets/card.svg"
import {ReactComponent as Redbubble} from "../assets/redbubble.svg"
import MenuOption from "../Components/MenuOption";

const Container = styled.div`
  padding: 50px;
  z-index: 0;
  height: 100%;
  background-color: white;
`

const StyledImage = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => !props.conditional || props.isOn ? 1 : 0};
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  pointer-events: none;
  z-index: ${props => props.z || "unset"};
`

const StyledSvg = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${props => props.z || "unset"};
  pointer-events: none;

  #gmail, #stackoverflow, #github, #keyboard, #art, #mobile, #book, #card, #redbubble {
    cursor: pointer;
    pointer-events: all;
  }
`

const StyledText = styled.span`
  font-weight: bold;
  color: white;
  font-size: 32px;
`

const DimensionalImage = ({src, clickable, isOn, z, ...props}) =>
    <StyledImage
        src={src} alt="img" draggable="false"
        clickable={clickable}
        z={z}
        isOn={isOn}
        {...props}
    />


const linkMapping = {
    "gmail": ["mailto:reallyliri@gmail.com", true],
    "stackoverflow": ["https://stackoverflow.com/users/1236401/mugen", true],
    "github": ["https://github.com/ReallyLiri", true],
    "redbubble": ["https://www.redbubble.com/people/ReallyLiri/shop", true],
    //"linkedin": ["http://www.linkedin.com/in/liri-sokol", true],
    "keyboard": ["/wip", false],
    "art": ["/drawings", false],
    "mobile": ["/uiux", false],
    "book": ["/courses", false],
    "card": ["/about", false]
}

const onClick = (name) => {
    const [url, isExternal] = linkMapping[name]
    if (isExternal) {
        navigationService.openTab(url);
    }
    else {
        navigationService.navigate(url);
    }
}

const elementByName = {}

const HomePage = () => {
    const [allOn, setAllOn] = useState(false);
    const [currentOn, setCurrentOn] = useState(null);

    useEffect(() => {
        const addListener = (name) => {
            elementByName[name].addEventListener('mouseenter', () => setCurrentOn(name));
            elementByName[name].addEventListener('mouseleave', () => setCurrentOn(null));
            elementByName[name].addEventListener('click', () => onClick(name));
        }

        for (const name of Object.keys(linkMapping)) {
            elementByName[name] = document.querySelector(`#${name}`);
            if (!elementByName[name]) {
                console.error("Could not find element", name);
                continue;
            }
            addListener(name);
        }
    }, [setCurrentOn])

    return <React.Fragment>
        <MenuOption
            onMouseEnter={() => setAllOn(true)}
            onMouseLeave={() => setAllOn(false)}
            text="Click on any highlighted item to explore its content"
        >
            <StyledText>?</StyledText>
        </MenuOption>

        <Container>

            <DimensionalImage src={'/static/images/d1.png'} z={1}/>
            <DimensionalImage src={'/static/images/d2.png'} z={2}/>
            <DimensionalImage src={'/static/images/d3-keyboard-sh.png'} conditional isOn={allOn || currentOn === "keyboard"} z={3}/>
            <DimensionalImage src={'/static/images/d22-card-sh.png'} conditional isOn={allOn || currentOn === "card"} z={4}/>
            <DimensionalImage src={'/static/images/d4.png'} z={5}/>
            <DimensionalImage src={'/static/images/d5-art-sh.png'} conditional isOn={allOn || currentOn === "art"} z={6}/>
            <DimensionalImage src={'/static/images/d6.png'} z={7}/>
            <DimensionalImage src={'/static/images/d7-github-sh.png'} conditional isOn={allOn || currentOn === "github"} z={8}/>
            <DimensionalImage src={'/static/images/d8-stackoverflow-sh.png'} conditional isOn={allOn || currentOn === "stackoverflow"} z={9}/>
            <DimensionalImage src={'/static/images/d9-gmail-sh.png'} conditional isOn={allOn || currentOn === "gmail"} z={10}/>
            <DimensionalImage src={'/static/images/d10-redbubble-sh.png'} conditional isOn={allOn || currentOn === "redbubble"} z={10}/>
            <DimensionalImage src={'/static/images/d11-book-sh.png'} conditional isOn={allOn || currentOn === "book"} z={11}/>
            <DimensionalImage src={'/static/images/d12.png'} z={12}/>
            <DimensionalImage src={'/static/images/d13-mobile-sh.png'} conditional isOn={allOn || currentOn === "mobile"} z={13}/>
            <DimensionalImage src={'/static/images/d14.png'} z={14}/>
            <DimensionalImage src={'/static/images/d15-book-text.png'} conditional isOn={allOn || currentOn === "book"} z={15}/>
            <DimensionalImage src={'/static/images/d16-mobile-text.png'} conditional isOn={allOn || currentOn === "mobile"} z={16}/>
            <DimensionalImage src={'/static/images/d17-art-text.png'} conditional isOn={allOn || currentOn === "art"} z={17}/>
            <DimensionalImage src={'/static/images/d18-keyboard-text.png'} conditional isOn={allOn || currentOn === "keyboard"} z={18}/>
            <DimensionalImage src={'/static/images/d19-github-text.png'} conditional isOn={allOn || currentOn === "github"} z={19}/>
            <DimensionalImage src={'/static/images/d20-stackoverflow-text.png'} conditional isOn={allOn || currentOn === "stackoverflow"} z={20}/>
            <DimensionalImage src={'/static/images/d21-gmail-text.png'} conditional isOn={allOn || currentOn === "gmail"} z={21}/>
            <DimensionalImage src={'/static/images/d22-card-text.png'} conditional isOn={allOn || currentOn === "card"} z={21}/>
            <DimensionalImage src={'/static/images/d23-redbubble-text.png'} conditional isOn={allOn || currentOn === "redbubble"} z={21}/>

            <StyledSvg z={4}>
                <Keyboard/>
            </StyledSvg>
            <StyledSvg z={4}>
                <Card/>
            </StyledSvg>
            <StyledSvg z={6}>
                <Art/>
            </StyledSvg>
            <StyledSvg z={8}>
                <Github/>
            </StyledSvg>
            <StyledSvg z={9}>
                <Stackoverflow/>
            </StyledSvg>
            <StyledSvg z={10}>
                <Gmail/>
            </StyledSvg>
            <StyledSvg z={10}>
                <Redbubble/>
            </StyledSvg>
            <StyledSvg z={11}>
                <Book/>
            </StyledSvg>
            <StyledSvg z={13}>
                <Mobile/>
            </StyledSvg>


        </Container>
    </React.Fragment>
}

export default HomePage;
