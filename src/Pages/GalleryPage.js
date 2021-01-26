import React from "react"
import styled from "styled-components/macro";

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

const GalleryPage = () =>
    <CenteredDiv>
        <Title>Gallery</Title>
    </CenteredDiv>

export default GalleryPage;
