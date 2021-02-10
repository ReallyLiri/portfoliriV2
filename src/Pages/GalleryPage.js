import React from "react"
import styled from "styled-components/macro";
import {GALLERIES} from "../Content/galleries";
import Gallery from "react-photo-gallery";

const Page = styled.div`
  padding: 30px;
  background: url("/static/images/Desktop.png") no-repeat fixed ;
  background-size: 100%;
`

const Title = styled.div`
  font-size: ${props => props.extra ? "32" : "26"}px;
  font-weight: bold;
  margin-bottom: 20px;
`

const Description = styled.div`
  margin-bottom: 20px;
`

const StyledGalleryContainer = styled.div`
  margin-bottom: 100px;
  
  img {
    max-height: 500px;
    width: auto;
  }
`

const OneGallery = ({name}) => {
    const {images, rowHeight, title, description, links} = GALLERIES[name]

    return <StyledGalleryContainer>
        <Title>{title}</Title>
        {
            description && <Description>{description}</Description>
        }
        {
            links && links.length ? <Description>
                See also:<br/>
                {
                    links.map(link => {
                        return <a target="_blank" rel="noopener noreferrer" href={link}>{link}<br/></a>
                    })
                }
            </Description> : null
        }
        <Gallery
            limitNodeSearch={1}
            targetRowHeight={rowHeight}
            photos={images}
            onClick={(event, obj) => {
                const newTab = window.open(images[obj.index].src, "_blank");
                newTab.focus();
            }}
        />
    </StyledGalleryContainer>
}

const GalleryPage = ({title, names}) => {
    return <Page>
        {
            title && <React.Fragment>
                <Title extra>{title}</Title>
                <div>-------------------------------------------</div>
            </React.Fragment>
        }
        {
            names.map(name => <OneGallery name={name} key={name}/>)
        }
    </Page>
}

export default GalleryPage;
