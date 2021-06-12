import React, { Component } from 'react';

export default class Gif extends Component {
    render() {
        return (
            <div class="w-75 d-flex align-items-center" style={{ marginLeft: "10%" }}>
                <div>
                    <h2 class="display-2">Hello, adventurer</h2>
                    <h3 class="text-muted ml-3">Welcome to my site, here you can ask for help others and help someone too</h3>
                    <img class="w-100" src="https://cutewallpaper.org/21/anime-gif-wallpaper-1920x1080/Pin-on-nim-gif.gif"></img>
                    <h5 class="display-7 ml-3 text-danger" style={{ float: "right" }}>Be kind and helpful</h5>
                </div>
            </div>
        )
    }
}