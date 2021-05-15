import React, {useCallback, useEffect, useState} from "react"
import styled from "styled-components/macro";
import Back from "../Components/Back";

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

const HorizontalStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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

const HeadshotImage = ({src, dimension, ...props}) =>
    <StyledImage
        src={src} alt="img" draggable="false"
        dimension={dimension}
        {...props}
    />

const imageSrc = i => `/static/images/headshots${i}.png`

const AboutPage = () => {
    const [dimension, setDimension] = useState(320)

    const resize = useCallback(() => {
        const height = window.innerHeight / 4.0
        const width = window.innerWidth / 5.0
        setDimension(Math.min(height, width))
    }, [setDimension])
    useEffect(() => {
        resize()
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize)
    }, [resize])

    return <React.Fragment>
        <Back/>
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
                <ContentBox dimension={dimension}>hello</ContentBox>
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
