import React, {useEffect, useState} from "react"
import styled from "styled-components/macro";
import Back from "../Components/Back";
import navigationService from "../utils/navigationService";
import FontAwesome from 'react-fontawesome'

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const StyledImage = styled.img`
  max-width: 20vw;
  max-height: 25vh;
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
  max-width: 40vw;
  max-height: 50vh;
  width: ${props => props.dimension * 2}px;
  height: ${props => props.dimension * 2}px;
`

const Paragraph = styled.p`
  font-size: 18px;
  margin: 32px;
  text-align: ${props => props.align || "justify"};
  font-weight: ${props => props.bold ? "bold" : "unset"};
`

const HeadshotImage = ({src, dimension, ...props}) =>
    <StyledImage
        src={src} alt="img" draggable="false"
        dimension={dimension}
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
  justify-content: center;
`

const imageSrc = i => `/static/images/headshots${i}.png`

const AboutPage = ({dimensions}) => {
    const [dimension, setDimension] = useState(320)
    const {isMobile} = dimensions;

    useEffect(() => {
        if (!dimensions) {
            return
        }
        const height = dimensions.height / 4.0
        const width = dimensions.width / 5.0
        setDimension(Math.min(height, width))
    }, [setDimension, dimensions])

    return <React.Fragment>
        <Back isMobile={isMobile}/>
        <Page>
            <HorizontalStack>
                <HeadshotImage src={imageSrc(1)} dimension={dimension}/>
                <HeadshotImage src={imageSrc(2)} dimension={dimension}/>
                <HeadshotImage src={imageSrc(3)} dimension={dimension}/>
                <HeadshotImage src={imageSrc(4)} dimension={dimension}/>
            </HorizontalStack>
            <HorizontalStack>
                <VerticalStack>
                    <HeadshotImage src={imageSrc(5)} dimension={dimension}/>
                    <HeadshotImage src={imageSrc(6)} dimension={dimension}/>
                </VerticalStack>
                <ContentBox dimension={dimension}>
                    <Paragraph align="center" bold>
                        Artist | Designer | Developer
                    </Paragraph>
                    <Paragraph>
                        Although my main ambition is riding on the back of a dragon towards the sunset, "Holy Diver" playing on the
                        background, I'm compromising on being a mad (computer) scientist at day and applying the shapes of my mind
                        to the materialized world at night.
                    </Paragraph>
                    <Paragraph>
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
                <VerticalStack>
                    <HeadshotImage src={imageSrc(7)} dimension={dimension}/>
                    <HeadshotImage src={imageSrc(8)} dimension={dimension}/>
                </VerticalStack>
            </HorizontalStack>
            <HorizontalStack>
                <HeadshotImage src={imageSrc(9)} dimension={dimension}/>
                <HeadshotImage src={imageSrc(10)} dimension={dimension}/>
                <HeadshotImage src={imageSrc(11)} dimension={dimension}/>
                <HeadshotImage src={imageSrc(12)} dimension={dimension}/>
            </HorizontalStack>
        </Page>
    </React.Fragment>
}

export default AboutPage;
