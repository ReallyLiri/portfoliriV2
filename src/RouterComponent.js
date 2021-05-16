import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import React, {useCallback, useEffect, useState} from 'react';
import HomePage from "./Pages/HomePage";
import styled from "styled-components";
import GalleryPage from "./Pages/GalleryPage";
import ProficienciesPage from "./Pages/ProficienciesPage";
import AboutPage from "./Pages/AboutPage";


const ContainerDiv = styled.div`
  height: 100vh;
  width: 100vw;
`

const IMAGES_TO_PREFETCH = [
    "Desktop.png",
    "d1.png",
    "d10-redbubble-sh.png",
    "d11-book-sh.png",
    "d12-book.png",
    "d12.png",
    "d13-mobile-sh.png",
    "d14-mobile.png",
    "d14.png",
    "d15-book-text.png",
    "d16-mobile-text.png",
    "d17-art-text.png",
    "d18-keyboard-text.png",
    "d19-github-text.png",
    "d2.png",
    "d20-stackoverflow-text.png",
    "d21-gmail-text.png",
    "d22-card-sh.png",
    "d22-card-text.png",
    "d23-redbubble-text.png",
    "d3-keyboard-sh.png",
    "d4-keyboard.png",
    "d4.png",
    "d5-art-sh.png",
    "d6-art.png",
    "d6.png",
    "d7-github-sh.png",
    "d8-stackoverflow-sh.png",
    "d9-gmail-sh.png",
    "headshots1.png",
    "headshots10.png",
    "headshots11.png",
    "headshots12.png",
    "headshots2.png",
    "headshots3.png",
    "headshots4.png",
    "headshots5.png",
    "headshots6.png",
    "headshots7.png",
    "headshots8.png",
    "headshots9.png",
    "profs-be-fw.png",
    "profs-be.png",
    "profs-cloud.png",
    "profs-db.png",
    "profs-design.png",
    "profs-mobile.png",
    "profs-tools.png",
    "profs-web.png",
    "profs-webserver.png"
]

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

    useEffect(() => {
        IMAGES_TO_PREFETCH.forEach(url => new Image().src = url)
    }, [])

    return <ContainerDiv>
        <Switch>
            <Route exact path='/' render={props => (
                <HomePage dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/about' render={props => (
                <AboutPage dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/proficiencies' render={props => (
                <ProficienciesPage dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/drawings' render={props => (
                <GalleryPage title="Paintings and Drawings" names={["drawings", "drawings-old"]} dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/uiux' render={props => (
                <GalleryPage title="Web/Mobile Designs" names={["corvus", "horrorun", "junana", "complicube", "uiux"]} dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/courses' render={props => (
                <GalleryPage title="Graphic Design Studies" names={["branding101", "design101", "illustrator", "photoshop"]} dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/miniatures' render={props => (
                <GalleryPage names={["miniatures"]} dimensions={dimensions} {...props}/>
            )}/>
            <Route path='/old-designs' render={props => (
                <GalleryPage names={["designs-old"]} dimensions={dimensions} {...props}/>
            )}/>
            <Redirect to='/'/>
        </Switch>
    </ContainerDiv>
}

export default withRouter(RouterComponent);
