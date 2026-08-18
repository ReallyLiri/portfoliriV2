import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GALLERIES } from "../Content/galleries";
import Gallery from "react-photo-gallery";
import navigationService from "../utils/navigationService";
import MenuOption from "../Components/MenuOption";
import ScrollToTop from "../Components/ScrollToTop";
import { useHistory, useLocation } from "react-router-dom";
import Back from "../Components/Back";

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
  transition: opacity 0.3s ease-in-out;
`;

const StyledLoader = styled.div`
  height: unset;
  width: unset;
  top: ${(props) => props.top}px;
  left: -${(props) => props.left}px;
  display: ${(props) => (props.loaded ? "none" : "unset")};
  margin-top: unset;
`;

const ImageRenderer = React.memo(
  ({
    index,
    onClick,
    photo,
    margin,
    key,
    animatedLoader = true,
    lazyLoading,
  }) => {
    const imgRef = useRef();
    const { loadedSrcs, visibleSrcs, observe, markAsLoaded } = lazyLoading;
    const isVisible = visibleSrcs.has(photo.src);
    const isLoaded = loadedSrcs.has(photo.src);

    useEffect(() => {
      if (imgRef.current && !isVisible) {
        observe(imgRef.current, photo.src);
      }
    }, [observe, photo.src, isVisible]);

    return (
      <React.Fragment key={key}>
        <StyledImage
          ref={imgRef}
          alt={key}
          onLoad={() => markAsLoaded(photo.src)}
          draggable="false"
          margin={margin}
          loaded={isLoaded}
          src={isVisible ? photo.src : undefined}
          width={photo.width}
          height={photo.height}
          onClick={(event) => onClick && onClick(event, { photo, index })}
        />
        {animatedLoader && (
          <StyledLoader
            className="lds-ripple"
            loaded={isLoaded}
            top={photo.height / 2 - 40}
            left={photo.width / 2 + 40}
          >
            <div></div>
            <div></div>
          </StyledLoader>
        )}
      </React.Fragment>
    );
  },
);

const OneGallery = ({ name, isMobile }) => {
  const { images, rowHeight, title, description, links, maxVw } =
    GALLERIES[name];
  const lazyLoading = useLazyLoading();
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
                  images[obj.index].full || images[obj.index].src,
                  "_blank",
                  "noopener,noreferrer",
                );
                newTab?.focus();
              }}
              renderImage={(props) => (
                <ImageRenderer {...props} lazyLoading={lazyLoading} />
              )}
            />
          </TilesGallery>
        ) : (
          <StackGallery maxVw={maxVw}>
            {images.map((image) => (
              <LazyMedia
                key={image.src}
                src={image.src}
                width={image.width}
                height={image.height}
                isVideo={image.src.endsWith("mp4")}
                lazyLoading={lazyLoading}
              />
            ))}
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

const useLazyLoading = () => {
  const [loadedSrcs, setLoadedSrcs] = useState(new Set());
  const [visibleSrcs, setVisibleSrcs] = useState(new Set());
  const observerRef = useRef();

  const observe = useCallback((element, src) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const src = entry.target.dataset.src;
            if (entry.isIntersecting && src) {
              setVisibleSrcs((prev) => new Set([...prev, src]));
              observerRef.current.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100px" },
      );
    }

    if (element) {
      element.dataset.src = src;
      observerRef.current.observe(element);
    }
  }, []);

  const markAsLoaded = useCallback((src) => {
    setLoadedSrcs((prev) => new Set([...prev, src]));
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { loadedSrcs, visibleSrcs, observe, markAsLoaded };
};

const LazyMedia = ({ src, width, height, isVideo, lazyLoading }) => {
  const mediaRef = useRef();
  const { loadedSrcs, visibleSrcs, observe, markAsLoaded } = lazyLoading;
  const isVisible = visibleSrcs.has(src);
  const isLoaded = loadedSrcs.has(src);

  useEffect(() => {
    if (mediaRef.current && !isVisible) {
      observe(mediaRef.current, src);
    }
  }, [observe, src, isVisible]);

  if (isVideo) {
    return (
      <video
        ref={mediaRef}
        key={src}
        width={width}
        height={height}
        autoPlay={isVisible}
        controls
        loop
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        onLoadStart={() => markAsLoaded(src)}
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>
    );
  }

  return (
    <img
      ref={mediaRef}
      key={src}
      src={isVisible ? src : undefined}
      alt={src}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      onLoad={() => markAsLoaded(src)}
    />
  );
};

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
