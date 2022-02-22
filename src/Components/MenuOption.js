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
  margin: 16px 4px ${props => props.vertical ? 2 : 10}px ${props => props.isMobile ? 8 : 16}px;
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
  margin-left: ${props => props.vertical ? 8 : 0}px;
  font-size: ${props => props.isMobile ? 12 : 22}px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
`

let mouseEnterTime = null

const MenuOption = ({className, top, circleColor, onMouseEnter, onMouseLeave, text, invertText, onClick, isMobile, smartMobileClick, vertical, children}) => {
    const [isHovered, setHovered] = useState(false)
    const Body = ({vertical}) => <React.Fragment>
        <Circle color={circleColor} isMobile={isMobile} vertical={vertical}>
            {children}
        </Circle>
        {
            isHovered && <HintText invertText={invertText} isMobile={isMobile} vertical={vertical}>{text}</HintText>
        }
    </React.Fragment>
    return <Container
        className={className}
        top={top}
        onClick={() => {
            if (isMobile && smartMobileClick && Date.now() - mouseEnterTime < 200) {
                return
            }
            onClick && onClick()
        }}
        onMouseEnter={isMobile ? null : () => {
            setHovered(true);
            mouseEnterTime = Date.now()
            onMouseEnter && onMouseEnter();
        }}
        onMouseLeave={isMobile ? null : () => {
            setHovered(false);
            onMouseLeave && onMouseLeave();
        }}
    >
        {
            vertical
                ? <Body vertical/>
                : <HorizontalStack>
                    <Body/>
                </HorizontalStack>
        }
    </Container>
}

export default MenuOption
