import React from "react";
import { PROFICIENCIES } from "../Content/proficiencies";
import styled from "styled-components";
import { ReactComponent as Neo4j } from "../assets/devicon/neo4j-plain.svg";
import { ReactComponent as Pandas } from "../assets/devicon/pandas-plain.svg";
import { ReactComponent as Sketch } from "../assets/devicon/sketch-plain.svg";
import { ReactComponent as Expo } from "../assets/devicon/expo-plain.svg";
import { ReactComponent as Netlify } from "../assets/devicon/netlify-plain.svg";
import Back from "../Components/Back";
import ScrollToTop from "../Components/ScrollToTop";

const Page = styled.div`
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  padding-left: ${(props) => (props.isMobile ? 20 : 80)}px;
  padding-bottom: ${(props) => (props.isMobile ? 35 : 60)}px;
  overflow: hidden;
`;

const Devicon = styled.i`
  font-size: ${(props) => (props.isMobile ? 32 : 60)}px;
  margin-left: ${(props) => (props.isMobile ? 4 : 10)}px;
`;

const Svg = styled.div`
  height: ${(props) => (props.isMobile ? 32 : 60)}px;
  width: ${(props) => (props.isMobile ? 32 : 60)}px;
  background: transparent;

  svg {
    height: ${(props) => (props.isMobile ? 32 : 60)}px;
    width: ${(props) => (props.isMobile ? 32 : 60)}px;

    path,
    rect,
    polygon,
    circle {
      fill: black;
    }
  }

  margin-left: ${(props) => (props.isMobile ? 4 : 10)}px;
`;

const Title = styled.div`
  font-size: ${(props) => (props.isMobile ? 10 : 16)}px;
  text-align: center;
  font-weight: bold;
`;

const nameToSvg = (name) => {
  switch (name) {
    case "neo4j":
      return <Neo4j />;
    case "pandas":
      return <Pandas />;
    case "sketch":
      return <Sketch />;
    case "expo":
      return <Expo />;
    case "netlify":
      return <Netlify />;
    default:
      return null;
  }
};

const HorizontalStack = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: start;
  overflow-x: ${(props) => (props.overflow ? "auto" : "unset")};
  padding-top: ${(props) => (props.overflow ? "16px" : "unset")};
  padding-bottom: ${(props) => (props.overflow ? "16px" : "unset")};
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: ${(props) => (props.padding ? `${props.padding}px` : "unset")};
  padding-top: ${(props) => (props.padding ? `${props.padding}px` : "unset")};
`;

const HorizontalDivider = styled.hr`
  border-top: ${(props) => (props.isMobile ? 2 : 4)}px solid black;
  border-radius: 2px;
  margin-top: ${(props) => (props.isMobile ? 16 : 32)}px;
  margin-right: ${(props) => (props.isMobile ? 16 : 80)}px;
`;

const VerticalDivider = styled.div`
  border-left: ${(props) => (props.isMobile ? 2 : 4)}px solid black;
  border-radius: 2px;
  margin-top: ${(props) => (props.isMobile ? 8 : 32)}px;
  height: ${(props) => (props.isMobile ? 120 : 230)}px;
  margin-right: 8px;
`;

const StyledImage = styled.img`
  width: ${(props) => (props.isMobile ? 130 : 260)}px;
  height: ${(props) => (props.isMobile ? 130 : 260)}px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  pointer-events: none;
`;

const ProficiencyImage = ({ src, ...props }) => (
  <StyledImage src={src} alt="img" draggable="false" {...props} />
);

const imageSrc = (name) => `/static/images/${name}.png`;

const ProficiencyName = styled.span`
  padding-top: ${(props) => (props.isMobile ? 8 : 12)}px;
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => (props.isMobile ? 10 : 16)}px;
`;

const ProficienciesPage = ({ dimensions }) => {
  const { isMobile } = dimensions;
  return (
    <React.Fragment>
      <Back isMobile={isMobile} />
      <Page isMobile={isMobile}>
        {Object.entries(PROFICIENCIES).map((pair, index) => {
          const name = pair[0];
          const { image, list } = pair[1];
          return (
            <React.Fragment key={name}>
              <HorizontalStack>
                <VerticalStack>
                  <ProficiencyImage src={imageSrc(image)} isMobile={isMobile} />
                  <Title isMobile={isMobile}>{name}</Title>
                </VerticalStack>
                <VerticalDivider isMobile={isMobile} />
                <HorizontalStack overflow>
                  {list.map((prof) => (
                    <VerticalStack key={prof.name} padding={isMobile ? 12 : 32}>
                      {prof.devicon && (
                        <Devicon
                          className={`devicon-${prof.devicon}-plain`}
                          isMobile={isMobile}
                        />
                      )}
                      {prof.svg && (
                        <Svg isMobile={isMobile}>{nameToSvg(prof.svg)}</Svg>
                      )}
                      <ProficiencyName isMobile={isMobile}>
                        {!prof.skipName ? prof.name : ""}
                      </ProficiencyName>
                    </VerticalStack>
                  ))}
                </HorizontalStack>
              </HorizontalStack>
              {index < Object.entries(PROFICIENCIES).length - 1 && (
                <HorizontalDivider isMobile={isMobile} />
              )}
            </React.Fragment>
          );
        })}
      </Page>
      <ScrollToTop isMobile={isMobile} invert />
    </React.Fragment>
  );
};

export default ProficienciesPage;
