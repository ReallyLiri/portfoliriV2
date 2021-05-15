import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import React, {useCallback, useEffect, useState} from 'react';
import HomePage from "./Pages/HomePage";
import styled from "styled-components";
import GalleryPage from "./Pages/GalleryPage";
import ProficienciesPage from "./Pages/ProficienciesPage";
import WipPage from "./Pages/WipPage";
import AboutPage from "./Pages/AboutPage";


const ContainerDiv = styled.div`
  height: 100vh;
  width: 100vw;
`

const RouterComponent = () => {

    const [dimensions, setDimensions] = useState({isMobile: false})

    const resize = useCallback(() => {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
            isMobile: window.innerWidth <= 700
        })
    }, [setDimensions])
    useEffect(() => {
        resize()
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize)
    }, [resize])

    return <ContainerDiv>
        <Switch>
            <Route exact path='/' render={props => (
                <HomePage dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/wip' render={props => (
                <WipPage {...props}/>
            )}/>
            <Route path='/about' render={props => (
                <AboutPage dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/proficiencies' render={props => (
                <ProficienciesPage {...props}/>
            )}/>
            <Route path='/drawings' render={props => (
                <GalleryPage title="Paintings and Drawings" names={["drawings", "drawings-old"]}/>
            )}/>
            <Route path='/uiux' render={props => (
                <GalleryPage title="Web/Mobile Designs" names={["corvus", "horrorun", "junana", "complicube", "uiux"]}/>
            )}/>
            <Route path='/courses' render={props => (
                <GalleryPage title="Graphic Design Studies" names={["branding101", "design101", "illustrator", "photoshop"]}/>
            )}/>
            <Route path='/miniatures' render={props => (
                <GalleryPage names={["miniatures"]}/>
            )}/>
            <Route path='/old-designs' render={props => (
                <GalleryPage names={["designs-old"]}/>
            )}/>
            <Redirect to='/'/>
        </Switch>
    </ContainerDiv>
}

export default withRouter(RouterComponent);
