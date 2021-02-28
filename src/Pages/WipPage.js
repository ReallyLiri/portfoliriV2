import React from "react"
import styled from "styled-components/macro";
import {Link} from "react-router-dom";

const CenteredDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
`

const WipPage = () => {
    return <CenteredDiv>
        <Title>Under Construction ... Come Back Later!</Title>
        <StyledLink to="/">Go Back</StyledLink>
    </CenteredDiv>
}

export default WipPage;
