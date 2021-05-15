import React from "react"
import {PROFICIENCIES} from "../Content/proficiencies";
import styled from "styled-components";
import {ReactComponent as Neo4j} from '../assets/devicon/neo4j-plain.svg';
import {ReactComponent as Pandas} from '../assets/devicon/pandas-plain.svg';
import {ReactComponent as Sketch} from '../assets/devicon/sketch-plain.svg';
import Back from "../Components/Back";

const Page = styled.div`
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  padding-left: 80px;
  padding-bottom: 60px;
`

const Devicon = styled.i`
  font-size: 60px;
  margin-left: 10px;
`

const Svg = styled.div`
  height: 60px;
  width: 60px;
  background: transparent;

  svg {
    height: 60px;
    width: 60px;

    path, rect, polygon, circle {
      fill: black;
    }
  }

  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`

const nameToSvg = (name) => {
    switch (name) {
        case "neo4j":
            return <Neo4j/>;
        case "pandas":
            return <Pandas/>;
        case "sketch":
            return <Sketch/>;
        default:
            return null;
    }
}

const HorizontalStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
`

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: ${props => props.padding ? `${props.padding}px` : "unset"};
  padding-top: ${props => props.padding ? `${props.padding}px` : "unset"};
`

const HorizontalDivider = styled.hr`
  border-top: 4px solid black;
  border-radius: 2px;
  margin-top: 32px;
  margin-right: 80px;
`

const VerticalDivider = styled.div`
  border-left: 4px solid black;
  border-radius: 2px;
  margin-top: 32px;
  height: 230px;
  margin-right: 8px;
`

const StyledImage = styled.img`
  width: 260px;
  height: 260px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  pointer-events: none;
`

const ProficiencyImage = ({src, ...props}) =>
    <StyledImage
        src={src} alt="img" draggable="false"
        {...props}
    />

const imageSrc = name => `/static/images/${name}.png`

const ProficiencyName = styled.span`
  padding-top: 12px;
  text-align: center;
  font-weight: bold;
`

const ProficienciesPage = () => <React.Fragment>
    <Back/>
    <Page>
        {
            Object.entries(PROFICIENCIES).map((pair) => {
                const name = pair[0];
                const {image, list} = pair[1];
                return (
                    <React.Fragment>
                        <HorizontalStack key={name}>
                            <VerticalStack>
                                <ProficiencyImage src={imageSrc(image)}/>
                                <Title>{name}</Title>
                            </VerticalStack>
                            <VerticalDivider/>
                            {
                                list.map((prof) =>
                                    <VerticalStack key={prof.name} padding={32}>
                                        {prof.devicon && <Devicon className={`devicon-${prof.devicon}-plain`}/>}
                                        {prof.svg && <Svg>{nameToSvg(prof.svg)}</Svg>}
                                        <ProficiencyName>{prof.name}</ProficiencyName>
                                    </VerticalStack>
                                )
                            }
                        </HorizontalStack>
                        <HorizontalDivider/>
                    </React.Fragment>
                )
            })
        }
    </Page>
</React.Fragment>

export default ProficienciesPage
