"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useYouTubePlayer(videoId, elementId) {
  const playerElementId = elementId || "video-player";
  const [playerState, setPlayerState] = useState({
    isReady: false,
    currentTrime: 0,
  });
  const playerRef = useRef(null);

  useEffect(() => {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log("Youtube video player is ready to roll");
      const videoOptions = {
        height: "390",
        width: "640",
        videoId: videoId,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: handelOnReady,
          onStateChange: handelOnStateChange,
        },
      };

      playerRef.current = new YT.Player(playerElementId, videoOptions);
    };
  }, [videoId]);

  const handelOnReady = useCallback((event) => {
    setPlayerState({ isReady: true });
  }, []);

  const handelOnStateChange = useCallback(() => {
    const playerStateObj = window.YT.PlayerState;
    const videoData = playerRef.current.getVideoData();
    const currentTime = playerRef.current.getCurrentTime();

    // console.log(playerStateObj);
    console.log(videoData);
    console.log(currentTime);
  }, []);
  return playerState;
}
