import React, {useState} from "react"
import styled from "styled-components/macro";
import {GALLERIES} from "../Content/galleries";
import Gallery from "react-photo-gallery";
import navigationService from "../utils/navigationService";
import MenuOption from "../Components/MenuOption";

const Page = styled.div`
  width: 100vw;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 80px;
`

const Title = styled.div`
  font-size: ${props => props.extra ? "32" : "26"}px;
  font-weight: bold;
  margin-bottom: ${props => props.extra ? "48" : "32"}px;
`

const Description = styled.div`
  margin-bottom: 20px;
`

const SeeAlso = styled.div`
  padding: 10px;
`

const StyledAnchor = styled.a`
  font-weight: bold;

  :link, :visited {
    color: white;
  }

  :hover, :active {
    color: black;
  }
`

const StyledGalleryContainer = styled.div`
  margin-bottom: 100px;

  img {
    max-width: 80%;
    max-height: 100%;
    height: auto;
    margin: 0 auto 40px auto !important;
  }
`

const HorizontalStack = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`

const PreviewContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Circle = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: white;
`

const StackGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`

const TilesGallery = styled.div`
  margin: 0 60px 0 60px;
`

const StyledArrow = styled.span`
  font-weight: bold;
  color: white;
  font-size: 42px;
`

const BackgroundImage = styled.img`
  width: 100vw;
  position: absolute;;
`

const PreviewImage = styled.img`
  height: 60px;
  opacity: ${props => props.isSelected ? "1" : "0.6"};
`

const OneGallery = ({name}) => {
    const {images, rowHeight, title, description, links} = GALLERIES[name]
    const useTilesGallery = !!rowHeight

    return <StyledGalleryContainer>
        <Title>{title}</Title>
        {
            description && <Description>{description}</Description>
        }
        {
            links && links.length ? <Description>
                <SeeAlso>See also:</SeeAlso>
                {
                    links.map(link => {
                        return <StyledAnchor target="_blank" rel="noopener noreferrer" href={link}>{link}<br/></StyledAnchor>
                    })
                }
            </Description> : null
        }
        {
            useTilesGallery
                ? <TilesGallery>
                    <Gallery
                        targetRowHeight={rowHeight}
                        photos={images}
                        onClick={(event, obj) => {
                            const newTab = window.open(images[obj.index].src, "_blank");
                            newTab.focus();
                        }}
                    />
                </TilesGallery>
                : <StackGallery>
                    {
                        images.map(image => <img key={image.src} src={image.src} alt={image.src}/>)
                    }
                </StackGallery>
        }
    </StyledGalleryContainer>
}

const GalleryPage = ({title, names}) => {
    const [galleryIndex, setGalleryIndex] = useState(0);
    return <React.Fragment>
        <MenuOption onClick={() => navigationService.navigate("/")} text="Back">
            <StyledArrow>🠔</StyledArrow>
        </MenuOption>
        {
            names.length > 1 &&
            names.map((name, i) =>
                <MenuOption onClick={() => setGalleryIndex(i)} text={GALLERIES[name].title} isSelected={galleryIndex === i} circleColor="white" top={80 + 80 * i}>
                        <PreviewImage src={GALLERIES[name].preview} alt={name} draggable="false" isSelected={i === galleryIndex}/>
                </MenuOption>
            )
        }
        <BackgroundImage src="/static/images/Desktop.png" alt="bg" draggable="false"/>
        <Page>
            {
                title && <Title extra>{title}</Title>
            }
            <OneGallery name={names[galleryIndex]}/>
        </Page>
    </React.Fragment>
}

export default GalleryPage;
