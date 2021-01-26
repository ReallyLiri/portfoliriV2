import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import React from 'react';
import HomePage from "./Pages/HomePage";
import styled from "styled-components";
import GalleryPage from "./Pages/GalleryPage";
import ProficienciesPage from "./Pages/ProficienciesPage";


const ContainerDiv = styled.div`
  height: 100vh;
  width: 100vw;
`

const RouterComponent = () => <ContainerDiv>
    <Switch>
        <Route exact path='/' render={props => (
            <HomePage/>
        )}/>
        <Route path='/about' render={props => (
            <GalleryPage {...props}/>
        )}/>
        <Route path='/proficiencies' render={props => (
            <ProficienciesPage {...props}/>
        )}/>
        <Redirect to='/'/>
    </Switch>
</ContainerDiv>

export default withRouter(RouterComponent);
