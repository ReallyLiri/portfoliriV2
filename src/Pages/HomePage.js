import React, {useEffect, useState} from "react"
import styled from "styled-components/macro";
import {ReactComponent as Desktop} from '../assets/Desktop.svg'

const CenteredDiv = styled.div`
  padding: 50px;

  #gmail-text {
    opacity: ${props => props.allOn || props.currentOn === "gmail" ? 1 : 0};
    cursor: pointer;
  }

  #gmail-sh {
    opacity: ${props => props.allOn || props.currentOn === "gmail" ? 1 : 0};
    cursor: pointer;
  }

  #stackoverflow-text {
    opacity: ${props => props.allOn || props.currentOn === "stackoverflow" ? 1 : 0};
    cursor: pointer;
  }

  #stackoverflow-sh {
    opacity: ${props => props.allOn || props.currentOn === "stackoverflow" ? 1 : 0};
    cursor: pointer;
  }

  #github-text {
    opacity: ${props => props.allOn || props.currentOn === "github" ? 1 : 0};
    cursor: pointer;
  }

  #github-sh {
    opacity: ${props => props.allOn || props.currentOn === "github" ? 1 : 0};
    cursor: pointer;
  }

  #keyboard-text {
    opacity: ${props => props.allOn || props.currentOn === "keyboard" ? 1 : 0};
    cursor: pointer;
  }

  #keyboard-sh {
    opacity: ${props => props.allOn || props.currentOn === "keyboard" ? 1 : 0};
    cursor: pointer;
  }

  #art-text {
    opacity: ${props => props.allOn || props.currentOn === "art" ? 1 : 0};
    cursor: pointer;
  }

  #art-sh {
    opacity: ${props => props.allOn || props.currentOn === "art" ? 1 : 0};
    cursor: pointer;
  }

  #mobile-text {
    opacity: ${props => props.allOn || props.currentOn === "mobile" ? 1 : 0};
    cursor: pointer;
  }

  #mobile-sh {
    opacity: ${props => props.allOn || props.currentOn === "mobile" ? 1 : 0};
    cursor: pointer;
  }

  #book-text {
    opacity: ${props => props.allOn || props.currentOn === "book" ? 1 : 0};
    cursor: pointer;
  }

  #book-sh {
    opacity: ${props => props.allOn || props.currentOn === "book" ? 1 : 0};
    cursor: pointer;
  }
`

const HomePage = () => {
    const [allOn, setAllOn] = useState(false);
    const [currentOn, setCurrentOn] = useState(null);

    useEffect(() => {
        const addListener = (name) => {
            const element = document.querySelector(`#${name}`);
            element.addEventListener('mouseenter', () => setCurrentOn(name));
            element.addEventListener('mouseover', () => setCurrentOn(null));
            element.addEventListener('click', () => console.log("CLICK!"));
        }
        addListener("gmail");
        addListener("stackoverflow");
        addListener("github");
        addListener("keyboard");
        addListener("art");
        addListener("mobile");
        addListener("book");
    }, [setCurrentOn])

    return <CenteredDiv allOn={allOn} currentOn={currentOn}>
        <Desktop/>
    </CenteredDiv>
}

export default HomePage;
