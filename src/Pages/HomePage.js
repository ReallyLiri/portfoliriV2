import React, {useState, useEffect} from "react"
import styled from "styled-components/macro";
import {ReactComponent as Desktop} from '../assets/Desktop.svg'

const CenteredDiv = styled.div`

  #gmail-text {
    opacity: ${props => props.allOn || props.currentOn === "gmail" ? 1 : 0};
  }

  #gmail-sh {
    opacity: ${props => props.allOn || props.currentOn === "gmail" ? 1 : 0};
  }

  #stackoverflow-text {
    opacity: ${props => props.allOn || props.currentOn === "stackoverflow" ? 1 : 0};
  }

  #stackoverflow-sh {
    opacity: ${props => props.allOn || props.currentOn === "stackoverflow" ? 1 : 0};
  }

  #github-text {
    opacity: ${props => props.allOn || props.currentOn === "github" ? 1 : 0};
  }

  #github-sh {
    opacity: ${props => props.allOn || props.currentOn === "github" ? 1 : 0};
  }

  #keyboard-text {
    opacity: ${props => props.allOn || props.currentOn === "keyboard" ? 1 : 0};
  }

  #keyboard-sh {
    opacity: ${props => props.allOn || props.currentOn === "keyboard" ? 1 : 0};
  }

  #art-text {
    opacity: ${props => props.allOn || props.currentOn === "art" ? 1 : 0};
  }

  #art-sh {
    opacity: ${props => props.allOn || props.currentOn === "art" ? 1 : 0};
  }

  #mobile-text {
    opacity: ${props => props.allOn || props.currentOn === "mobile" ? 1 : 0};
  }

  #mobile-sh {
    opacity: ${props => props.allOn || props.currentOn === "mobile" ? 1 : 0};
  }

  #book-text {
    opacity: ${props => props.allOn || props.currentOn === "book" ? 1 : 0};
  }

  #book-sh {
    opacity: ${props => props.allOn || props.currentOn === "book" ? 1 : 0};
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
