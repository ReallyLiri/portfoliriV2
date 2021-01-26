import React from "react"
import {PROFICIENCIES} from "../Content/proficiencies";
import styled from "styled-components";
import { ReactComponent as Neo4j } from '../assets/devicon/neo4j-plain.svg';
import { ReactComponent as Pandas } from '../assets/devicon/pandas-plain.svg';
import { ReactComponent as Sketch } from '../assets/devicon/sketch-plain.svg';


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
  }
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`

const Line = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;
`

const nameToSvg = (name) => {
    switch (name) {
        case "neo4j":
            return <Neo4j/>;
        case "pandas":
            return <Pandas/>;
        case "sketch":
            return <Sketch/>;
    }
}

const ProficienciesPage = () => <React.Fragment>
    {
        Object.entries(PROFICIENCIES).map((pair) => {
            const name = pair[0];
            const profList = pair[1];
            return (
                <div key={name}>
                    <Title>{name}</Title>
                    {
                        profList.map((prof) =>
                            <Line key={prof.name}>
                                {prof.name}
                                {prof.devicon && <Devicon className={`devicon-${prof.devicon}-plain colored`}/>}
                                {prof.svg && <Svg>{nameToSvg(prof.svg)}</Svg>}
                            </Line>
                        )
                    }
                </div>
            )
        })
    }
</React.Fragment>

export default ProficienciesPage
