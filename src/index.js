import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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

setTimeout(() => IMAGES_TO_PREFETCH.forEach(url => new Image().src = url), 0)

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
