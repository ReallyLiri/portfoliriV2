import React from "react"
import styled from "styled-components/macro";
import {Link} from 'react-router-dom';
import {ReactComponent as Desktop} from '../assets/Desktop.svg'

const CenteredDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  #Mug:hover {
    stroke: red;
  }
`

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`

const StyledLink = styled(Link)`
  font-size: 20px;
  margin-bottom: 20px;
`

const Whitespace = styled.div`
  height: 50px;
`

const StyledAnchor = styled.a`
  font-size: 20px;
  margin-bottom: 20px;
`

const ExternalLink = ({to, children}) =>
    <StyledAnchor href={to} target="_blank" rel="noopener noreferrer">
        {children}
    </StyledAnchor>

const HomePage = () =>
    <CenteredDiv>
        <Desktop/>
    </CenteredDiv>

export default HomePage;
