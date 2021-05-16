import React, {useEffect, useState} from "react"
import styled from "styled-components/macro";
import Back from "../Components/Back";
import navigationService from "../utils/navigationService";
import FontAwesome from 'react-fontawesome'

const Page = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: white;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  overscroll-behavior: none;
  padding-top: ${props => props.isMobile ? 96 : 0}px;
`

const StyledImage = styled.img`
  max-width: 25vw;
  max-height: ${props => props.isMobile ? 20 : 25}vh;
  width: ${props => props.dimension}px;
  height: ${props => props.dimension}px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  pointer-events: none;
`

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentBox = styled.div`
  max-width: ${props => props.isMobile ? 60 : 40}vw;
  max-height: ${props => props.isMobile ? 60 : 50}vh;
  width: ${props => props.dimension * 2}px;
  height: ${props => props.isMobile ? props.dimension * 3 : props.dimension * 2}px;

`

const Paragraph = styled.p`
  font-size: ${props => props.isMobile ? 12 : 18}px;
  margin: ${props => props.isMobile ? 8 : 32}px;
  text-align: ${props => props.align || "justify"};
  font-weight: ${props => props.bold ? "bold" : "unset"};
`

const HeadshotImage = ({src, dimension, isMobile, ...props}) =>
    <StyledImage
        src={src} alt="img" draggable="false"
        dimension={dimension}
        isMobile={isMobile}
        {...props}
    />

const SocialLink = ({name, url, tip}) =>
    <FontAwesome
        title={tip || name}
        className="super-crazy-colors"
        name={name}
        size="1x"
        style={{cursor: "pointer", padding: "8px"}}
        onClick={() => navigationService.openTab(url)}
    />

const Separator = styled.span`
  font-size: 32px;
`

const HorizontalStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${props => props.isMobile ? "space-between" : "center"};
`

const imageSrc = i => `/static/images/headshots${i}.png`

const AboutPage = ({dimensions}) => {
    const [dimension, setDimension] = useState(320)
    const {isMobile} = dimensions;

    useEffect(() => {
        if (!dimensions) {
            return
        }
        const height = dimensions.height / (isMobile ? 5.0 : 4.0)
        const width = dimensions.width / 4.0
        setDimension(Math.min(height, width))
    }, [setDimension, dimensions])

    const MainContent = () => <ContentBox dimension={dimension} isMobile={isMobile}>
        <Paragraph isMobile={isMobile} align="center" bold>
            Liri Sokol
        </Paragraph>
        <Paragraph isMobile={isMobile} align="center" bold>
            Artist · Designer · Developer
        </Paragraph>
        <Paragraph isMobile={isMobile}>
            Although my main ambition is riding on the back of a dragon towards the sunset, "Holy Diver" playing on the
            background, I'm compromising on being a mad (computer) scientist at day and applying the shapes of my mind
            to the materialized world at night.
        </Paragraph>
        <Paragraph isMobile={isMobile}>
            I believe we live in the best of all possible worlds, that we are all a part of a hive with one a collective
            mind and that our perception has the power to shape the very core of existence. Oh, and cats rule the world.
            Of course.
        </Paragraph>
        <HorizontalStack>
            <SocialLink name="paper-plane" url="mailto:reallyliri@gmail.com" tip="mail"/>
            <Separator>·</Separator>
            <SocialLink name="linkedin" url="https://linkedin.com/in/liri-sokol"/>
        </HorizontalStack>
    </ContentBox>

    return <React.Fragment>
        <Back isMobile={isMobile}/>
        <Page isMobile={isMobile}>
            {
                isMobile
                    ? <React.Fragment>
                        <HorizontalStack isMobile={isMobile}>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(1)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(10)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(3)} dimension={dimension}/>
                        </HorizontalStack>
                        <HorizontalStack isMobile={isMobile}>
                            <VerticalStack>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(2)} dimension={dimension}/>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(8)} dimension={dimension}/>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(6)} dimension={dimension}/>
                            </VerticalStack>
                            <MainContent/>
                            <VerticalStack>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(7)} dimension={dimension}/>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(5)} dimension={dimension}/>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(9)} dimension={dimension}/>
                            </VerticalStack>
                        </HorizontalStack>
                        <HorizontalStack isMobile={isMobile}>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(4)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(11)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(12)} dimension={dimension}/>
                        </HorizontalStack>
                    </React.Fragment>

                    : <React.Fragment>
                        <HorizontalStack isMobile={isMobile}>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(1)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(10)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(3)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(12)} dimension={dimension}/>
                        </HorizontalStack>
                        <HorizontalStack isMobile={isMobile}>
                            <VerticalStack>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(7)} dimension={dimension}/>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(6)} dimension={dimension}/>
                            </VerticalStack>
                            <MainContent/>
                            <VerticalStack>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(5)} dimension={dimension}/>
                                <HeadshotImage isMobile={isMobile} src={imageSrc(8)} dimension={dimension}/>
                            </VerticalStack>
                        </HorizontalStack>
                        <HorizontalStack isMobile={isMobile}>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(9)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(2)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(11)} dimension={dimension}/>
                            <HeadshotImage isMobile={isMobile} src={imageSrc(4)} dimension={dimension}/>
                        </HorizontalStack>
                    </React.Fragment>
            }
        </Page>
    </React.Fragment>
}

export default AboutPage;
