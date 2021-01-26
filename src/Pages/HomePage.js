import React from "react"
import styled from "styled-components/macro";
import {Link} from 'react-router-dom';

const CenteredDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
        <Title>Liri Portfolio</Title>
        <Whitespace/>

        <StyledLink to="/proficiencies">Proficiencies</StyledLink>
        <StyledLink to="/about">Drawings</StyledLink>
        <StyledLink to="/about">UI/UX</StyledLink>
        <StyledLink to="/about">Courses</StyledLink>
        <StyledLink to="/about">Miniatures</StyledLink>
        <StyledLink to="/about">Old Designs</StyledLink>
        <StyledLink to="/about">Old Drawings</StyledLink>
        <Whitespace/>
        <ExternalLink to="http://www.linkedin.com/in/liri-sokol">Linkedin</ExternalLink>
        <ExternalLink to="https://github.com/ReallyLiri">Github</ExternalLink>
        <ExternalLink to="https://stackoverflow.com/users/1236401/mugen">Stackoverflow</ExternalLink>
        <ExternalLink to="mailto:reallyliri@gmail.com">Gmail</ExternalLink>
    </CenteredDiv>

export default HomePage;
