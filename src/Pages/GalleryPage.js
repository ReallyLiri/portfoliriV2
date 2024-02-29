import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GALLERIES } from "../Content/galleries";
import Gallery from "react-photo-gallery";
import navigationService from "../utils/navigationService";
import MenuOption from "../Components/MenuOption";
import ScrollToTop from "../Components/ScrollToTop";
import { useHistory, useLocation } from "react-router-dom";
import Back from "../Components/Back";
import _ from "lodash";

const Page = styled.div`
  width: 100vw;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: ${(props) => (props.isMobile ? 10 : 80)}px;
`;

const Title = styled.div`
  font-size: ${(props) =>
    props.isMobile ? (props.extra ? 16 : 12) : props.extra ? 48 : 32}px;
  ${(props) =>
    !props.isMobile &&
    "text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;"}
  font-weight: bolder;
  margin-top: ${(props) =>
    props.isMobile ? (props.extra ? 32 : 4) : props.extra ? 148 : 32}px;
  margin-bottom: ${(props) =>
    props.isMobile ? (props.extra ? 12 : 4) : props.extra ? 48 : 32}px;
  color: ${(props) => (props.isMobile ? "white" : "black")};
`;

const Description = styled.div`
  margin-bottom: ${(props) => (props.isMobile ? 2 : 20)}px;
  color: white;
`;

const SeeAlso = styled.div`
  padding: ${(props) => (props.isMobile ? 6 : 10)}px;
  font-weight: bold;
  font-size: ${(props) => (props.isMobile ? 12 : 16)}px;
`;

const StyledAnchor = styled.a`
  font-weight: bold;
  font-size: ${(props) => (props.isMobile ? 12 : 16)}px;

  :link,
  :visited {
    color: white;
  }

  :hover,
  :active {
    color: black;
  }
`;

const StyledGalleryContainer = styled.div`
  margin-bottom: ${(props) => (props.isMobile ? 30 : 100)}px;

  img,
  video,
  source {
    max-width: ${(props) => (props.isMobile ? 75 : 80)}%;
    max-height: 100%;
    margin: 0 auto ${(props) => (props.isMobile ? 16 : 40)}px auto !important;
  }

  img {
    height: auto;
  }
`;

const StackGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;

  img {
    max-width: ${(props) => props.maxVw || 100}vw;
  }
`;

const TilesGallery = styled.div`
  margin: 0 ${(props) => (props.isMobile ? 12 : 60)}px 0
    ${(props) => (props.isMobile ? 12 : 60)}px;

  .react-photo-gallery--gallery > div {
    align-items: flex-start;
  }
`;

const BackgroundImage = styled.img`
  width: 100vw;
  position: absolute;
  filter: hue-rotate(${(props) => props.hueDegrees}deg);
`;

const PreviewImage = styled.img`
  height: ${(props) => (props.isMobile ? 32 : 60)}px;
  opacity: ${(props) => (props.isSelected ? "1" : "0.6")};
`;

const GalleryWrapper = styled.div`
  margin-top: ${(props) => (props.isMobile ? 16 : 116)}px;
`;

const StyledImage = styled.img`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: pointer;
  margin: ${(props) => props.margin || "unset"};
  display: block;
  opacity: ${(props) => (props.loaded ? "unset" : 0)};
`;

const StyledLoader = styled.div`
  height: unset;
  width: unset;
  top: ${(props) => props.top}px;
  left: -${(props) => props.left}px;
  display: ${(props) => (props.loaded ? "none" : "unset")};
  margin-top: unset;
`;

const imageRender = ({
  index,
  onClick,
  photo,
  margin,
  key,
  animatedLoader = true,
  loadedImages,
  setLoadedImages,
}) => (
  <React.Fragment key={key}>
    <StyledImage
      alt={key}
      onLoad={() => setLoadedImages([...loadedImages, photo.src])}
      draggable="false"
      margin={margin}
      loaded={_.includes(loadedImages, photo.src)}
      {...photo}
      onClick={(event) => onClick && onClick(event, { photo, index })}
    />
    {animatedLoader && (
      <StyledLoader
        className="lds-ripple"
        loaded={_.includes(loadedImages, photo.src)}
        top={photo.height / 2 - 40}
        left={photo.width / 2 + 40}
      >
        <div></div>
        <div></div>
      </StyledLoader>
    )}
  </React.Fragment>
);

const OneGallery = ({ name, isMobile }) => {
  const { images, rowHeight, title, description, links, maxVw } =
    GALLERIES[name];
  const [loadedImages, setLoadedImages] = useState([]);
  const useTilesGallery = !!rowHeight;

  return (
    <StyledGalleryContainer isMobile={isMobile}>
      <Title isMobile={isMobile}>{title}</Title>
      {description && (
        <Description isMobile={isMobile}>{description}</Description>
      )}
      {links && links.length ? (
        <Description>
          <SeeAlso isMobile={isMobile}>See also:</SeeAlso>
          {links.map((link) => {
            return (
              <StyledAnchor
                key={link}
                isMobile={isMobile}
                target="_blank"
                rel="noopener noreferrer"
                href={link}
              >
                {link}
                <br />
              </StyledAnchor>
            );
          })}
        </Description>
      ) : null}
      <GalleryWrapper isMobile={isMobile}>
        {useTilesGallery ? (
          <TilesGallery isMobile={isMobile}>
            <Gallery
              targetRowHeight={rowHeight}
              photos={images}
              onClick={(event, obj) => {
                const newTab = window.open(
                  images[obj.index].src,
                  "_blank",
                  "noopener,noreferrer",
                );
                newTab?.focus();
              }}
              renderImage={(props) =>
                imageRender({ ...props, loadedImages, setLoadedImages })
              }
            />
          </TilesGallery>
        ) : (
          <StackGallery maxVw={maxVw}>
            {images.map((image) =>
              image.src.endsWith("mp4") ? (
                <video
                  key={image.src}
                  width={image.width}
                  height={image.height}
                  autoPlay
                  controls
                  loop
                >
                  <source src={image.src} type="video/mp4" />
                </video>
              ) : (
                <img key={image.src} src={image.src} alt={image.src} />
              ),
            )}
          </StackGallery>
        )}
      </GalleryWrapper>
    </StyledGalleryContainer>
  );
};

const Footer = styled.div`
  display: flex;
  opacity: 30%;
  width: 100%;
  justify-content: center;
  position: fixed;
  bottom: ${(props) => (props.isMobile ? 10 : 32)}px;
  left: 0;
`;

const Copyrights = styled.span`
  color: white;
  font-size: ${(props) => (props.isMobile ? 12 : 16)}px;
  background-color: deeppink;
  padding: 3px;
  border-radius: 2px;
`;

const nextDegrees = () => Math.floor(Math.random() * 360);

const GalleryPage = ({ title, names, dimensions }) => {
  const [hueDegrees, setHueDegrees] = useState(nextDegrees);
  const location = useLocation();
  const { i } = navigationService.parseSearchString(location.search);
  const [galleryIndex, setGalleryIndex] = useState(parseInt(i) || 0);
  const history = useHistory();
  const { isMobile } = dimensions;

  useEffect(
    () => setHueDegrees(nextDegrees()),
    [title, galleryIndex, setHueDegrees],
  );

  return (
    <React.Fragment>
      <Back isMobile={isMobile} />
      {names.length > 1 &&
        names.map((name, i) => (
          <MenuOption
            key={i}
            isMobile={isMobile}
            onClick={() => {
              setGalleryIndex(i);
              history.push({
                pathname: location.pathname,
                search: navigationService.buildSearchString({ i }),
              });
              navigationService.scrollToTop();
            }}
            text={GALLERIES[name].title}
            circleColor="white"
            top={isMobile ? 40 + 40 * i : 80 + 80 * i}
          >
            <PreviewImage
              src={GALLERIES[name].preview}
              alt={name}
              draggable="false"
              isSelected={i === galleryIndex}
              isMobile={isMobile}
            />
          </MenuOption>
        ))}
      <BackgroundImage
        src="/static/images/Desktop.png"
        alt="bg"
        draggable="false"
        hueDegrees={hueDegrees}
      />
      <Page isMobile={isMobile}>
        {title && (
          <Title isMobile={isMobile} extra>
            {title}
          </Title>
        )}
        <OneGallery isMobile={isMobile} name={names[galleryIndex]} />
      </Page>
      <ScrollToTop isMobile={isMobile} />
      <Footer isMobile={isMobile}>
        <Copyrights isMobile={isMobile}>
          Liri Sokol © 1992-{new Date().getFullYear()}
        </Copyrights>
      </Footer>
    </React.Fragment>
  );
};

export default GalleryPage;
