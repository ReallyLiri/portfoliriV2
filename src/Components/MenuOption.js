import React, {useState} from "react";
import styled from "styled-components/macro";

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${props => props.color || "black"};
  margin: 10px 5px 10px 10px;
  cursor: pointer;
`

const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: ${props => props.top || 0}px;
`

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const HintText = styled.div`
  background-color: ${props => props.invertText ? "white" : "black"};
  color: ${props => props.invertText ? "black" : "white"};
  border-radius: 4px;
  padding: 6px;
  font-size: 22px;
  font-weight: bold;
  user-select: none;
`

export default ({className, top, circleColor, onMouseEnter, onMouseLeave, text, invertText, onClick, children}) => {
    const [isHovered, setHovered] = useState(false)
    return <Container
        className={className}
        top={top}
        onClick={() => onClick && onClick()}
        onMouseEnter={() => {
            setHovered(true);
            onMouseEnter && onMouseEnter();
        }}
        onMouseLeave={() => {
            setHovered(false);
            onMouseLeave && onMouseLeave();
        }}
    >
        <HorizontalStack>
            <Circle color={circleColor}>
                {children}
            </Circle>
            {
                isHovered && <HintText invertText={invertText}>{text}</HintText>
            }
        </HorizontalStack>
    </Container>
}
