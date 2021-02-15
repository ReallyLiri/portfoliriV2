import React, {useState} from "react"
import styled from "styled-components/macro";
import {GALLERIES} from "../Content/galleries";
import Gallery from "react-photo-gallery";
import navigationService from "../utils/navigationService";
import MenuOption from "../Components/MenuOption";
import ScrollToTop from "../Components/ScrollToTop";
import {useHistory, useLocation} from "react-router-dom";

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

  img, video, source {
    max-width: 80%;
    max-height: 100%;
    margin: 0 auto 40px auto !important;
  }

  img {
    height: auto;
  }
`

const StackGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;

  img {
    max-width: ${props => props.maxVw || 100}vw;
  }
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
    const {images, rowHeight, title, description, links, maxVw} = GALLERIES[name]
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
                        return <StyledAnchor key={link} target="_blank" rel="noopener noreferrer" href={link}>{link}<br/></StyledAnchor>
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
                : <StackGallery maxVw={maxVw}>
                    {
                        images.map(image =>
                            image.src.endsWith("mp4")
                                ? <video key={image.src} width={image.width} height={image.height} autoPlay controls loop>
                                    <source src={image.src} type="video/mp4"/>
                                </video>
                                : <img key={image.src} src={image.src} alt={image.src}/>
                        )
                    }
                </StackGallery>
        }
    </StyledGalleryContainer>
}

const GalleryPage = ({title, names}) => {
    const location = useLocation();
    const {i} = navigationService.parseSearchString(location.search);
    const [galleryIndex, setGalleryIndex] = useState(parseInt(i) || 0);
    const history = useHistory();
    return <React.Fragment>
        <MenuOption onClick={() => navigationService.navigate("/")} text="Back">
            <StyledArrow>🠔</StyledArrow>
        </MenuOption>
        {
            names.length > 1 &&
            names.map((name, i) =>
                <MenuOption
                    onClick={() => {
                        setGalleryIndex(i);
                        history.push({pathname: location.pathname, search: navigationService.buildSearchString({i})});
                    }}
                    text={GALLERIES[name].title}
                    circleColor="white" top={80 + 80 * i}
                >
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
        <ScrollToTop/>
    </React.Fragment>
}

export default GalleryPage;
