import React, {useEffect} from "react"
import styled from "styled-components/macro";
import {ReactComponent as Desktop} from '../assets/Desktop.svg'
import navigationService from "../utils/navigationService";

const CenteredDiv = styled.div`
  padding: 50px;

  #gmail, #stackoverflow, #github, #keyboard, #art, #mobile, #book {
    cursor: pointer;
  }

  #gmail-text, #gmail-sh,
  #stackoverflow-text, #stackoverflow-sh,
  #github-text, #github-sh,
  #keyboard-text, #keyboard-sh,
  #art-text, #art-sh,
  #mobile-text, #mobile-sh,
  #book-text, #book-sh {
    opacity: 0;
    cursor: pointer;
  }
`

let currentOn = null;

const setCurrentOn = (name) => {
    console.log(name)
    if (name == null) {
        document.querySelector(`#${currentOn}-text`).style.opacity = "0";
        document.querySelector(`#${currentOn}-sh`).style.opacity = "0";
        currentOn = null;
    }
    else {
        document.querySelector(`#${name}-text`).style.opacity = "1";
        document.querySelector(`#${name}-sh`).style.opacity = "1";
        currentOn = name;
    }
}

const linkMapping = {
    "gmail": ["mailto:reallyliri@gmail.com", true],
    "stackoverflow": ["https://stackoverflow.com/users/1236401/mugen", true],
    "github": ["https://github.com/ReallyLiri", true],
    "linkedin": ["http://www.linkedin.com/in/liri-sokol", true],
    "keyboard": ["/proficiencies", false],
    "art": ["/drawings", false],
    "mobile": ["/uiux", false],
    "book": ["/courses", false]
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

const names = [
    "gmail",
    "stackoverflow",
    "github",
    "keyboard",
    "art",
    "mobile",
    "book"
]

const elementByName = {}

const HomePage = () => {

    useEffect(() => {
        const addListener = (name) => {
            elementByName[name].addEventListener('mouseenter', () => setCurrentOn(name));
            elementByName[name].addEventListener('mouseleave', () => setCurrentOn(null));
            elementByName[name].addEventListener('click', () => onClick(name));
        }

        for (const name of names) {
            elementByName[name] = document.querySelector(`#${name}`);
            elementByName[`${name}-sh`] = document.querySelector(`#${name}-sh`);
            elementByName[`${name}-text`] = document.querySelector(`#${name}-text`);
            addListener(name);
        }
    }, [])

    return <CenteredDiv>
        <Desktop/>
    </CenteredDiv>
}

export default HomePage;
