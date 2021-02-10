import React, {useState} from "react"
import styled from "styled-components/macro";
import {GALLERIES} from "../Content/galleries";
import Gallery from "react-photo-gallery";

const Page = styled.div`
  background: url("/static/images/Desktop.png") no-repeat fixed;
  background-size: 100%;
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

const PreviewImage = styled.div`
  cursor: pointer;
  margin: 0 10px 0 10px;
  background-color: white;
  border-radius: 50%;
  border: 4px solid ${props => props.isSelected ? "white" : "transparent"};

  img {
    height: 150px;
    opacity: ${props => props.isSelected ? "1" : "0.6"};
  }
`

const Preview = ({name, onClick, isSelected, isLast}) =>
    <PreviewContent>
        <PreviewImage onClick={() => onClick()} isSelected={isSelected} title={GALLERIES[name].title}>
            <img src={GALLERIES[name].preview} alt={name}/>
        </PreviewImage>
        {
            !isLast && <Circle/>
        }
    </PreviewContent>

const StackGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`

const TilesGallery = styled.div`
    margin: 0 60px 0 60px;
`

const OneGallery = ({name}) => {
    const {images, rowHeight, title, description, links} = GALLERIES[name]
    const useTilesGallery = !!rowHeight
    console.error(useTilesGallery)

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
                        images.map(
                            image =>
                                <a key={image.src} href={image.src} target="_blank" rel="noreferrer">
                                    <img src={image.src} alt={image.src}/>
                                </a>
                        )
                    }
                </StackGallery>
        }
    </StyledGalleryContainer>
}

const GalleryPage = ({title, names}) => {
    const [galleryIndex, setGalleryIndex] = useState(0);
    return <Page>
        {
            title && <React.Fragment>
                <Title extra>{title}</Title>
                <HorizontalStack>
                    {
                        names.map((name, i) => <Preview name={name} key={name} onClick={() => setGalleryIndex(i)} isSelected={galleryIndex === i} isLast={i === names.length - 1}/>)
                    }
                </HorizontalStack>
            </React.Fragment>
        }
        <OneGallery name={names[galleryIndex]}/>
    </Page>
}

export default GalleryPage;
