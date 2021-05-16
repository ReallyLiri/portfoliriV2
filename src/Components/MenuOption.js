import React, {useState} from "react";
import styled from "styled-components/macro";

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.isMobile ? 32 : 60}px;
  width: ${props => props.isMobile ? 32 : 60}px;
  border-radius: 50%;
  background-color: ${props => props.color || "black"};
  margin: 16px 4px 10px ${props => props.isMobile ? 8 : 16}px;
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
  font-size: ${props => props.isMobile ? 12 : 22}px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
`

let mouseEnterTime = null

const MenuOption = ({className, top, circleColor, onMouseEnter, onMouseLeave, text, invertText, onClick, isMobile, smartMobileClick, children}) => {
    const [isHovered, setHovered] = useState(false)
    return <Container
        className={className}
        top={top}
        onClick={() => {
            if (isMobile && smartMobileClick && Date.now() - mouseEnterTime < 1000) {
                return
            }
            onClick && onClick()
        }
        }
        onMouseEnter={() => {
            setHovered(true);
            mouseEnterTime = Date.now()
            onMouseEnter && onMouseEnter();
        }}
        onMouseLeave={() => {
            setHovered(false);
            onMouseLeave && onMouseLeave();
        }}
    >
        <HorizontalStack>
            <Circle color={circleColor} isMobile={isMobile}>
                {children}
            </Circle>
            {
                isHovered && <HintText invertText={invertText} isMobile={isMobile}>{text}</HintText>
            }
        </HorizontalStack>
    </Container>
}

export default MenuOption
