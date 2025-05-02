"use client"

import { useEffect } from "react";


export default function useYouTubePlayer(videoId, elementId) {
    const playerElementId = elementId || "video-player"
    
    useEffect(() => {
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            console.log("Youtube video player is ready to roll")
            const videoOptions = {
                height: '390',
                width: '640',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1
                },
                events: {
                    'onReady': (event) => {console.log("on ready", event)},
                    'onStateChange': (event) => {console.log("on on state change", event)}
                }
                }
            
            new YT.Player(playerElementId, videoOptions);
             
        }
    }, [videoId])

    return ""
    
}
