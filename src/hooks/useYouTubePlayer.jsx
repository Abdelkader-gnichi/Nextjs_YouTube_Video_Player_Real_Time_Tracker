"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function useYouTubePlayer(
  videoId,
  elementId,
  startTime = 200,
  interval = 5000,
) {
  const playerElementId = elementId || "video-player";
  const [playerState, setPlayerState] = useState({
    isReady: false,
    currentTime: 0,
    videoData: { title: "" },
    videoStateLabel: "",
    videoStateValue: -10,
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
          start: startTime,
        },
        events: {
          onReady: handelOnReady,
          onStateChange: handelOnStateChange,
        },
      };

      playerRef.current = new YT.Player(playerElementId, videoOptions);
    };
  }, [videoId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handelOnStateChange();
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handelOnReady = useCallback((event) => {
    setPlayerState((prevState) => ({ ...prevState, isReady: true }));
    handelOnStateChange();
  }, []);

  const handelOnStateChange = useCallback(() => {
    const playerStateObj = window.YT.PlayerState;
    const playerInfo = playerRef.current.playerInfo;
    const videoData = playerRef.current.getVideoData();
    const currentTime = playerRef.current.getCurrentTime();
    const videoStateValue = playerInfo.playerState;
    const videoStateLabel = getKeyByValue(playerStateObj, videoStateValue);

    setPlayerState((prevState) => ({
      ...prevState,
      videoData: { title: videoData.title },
      currentTime: currentTime,
      videoStateLabel: videoStateLabel,
      videoStateValue: videoStateValue,
    }));
  }, []);

  return playerState;
}
