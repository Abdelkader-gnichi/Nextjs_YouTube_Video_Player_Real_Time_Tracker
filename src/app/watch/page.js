"use client";

import useYouTubePlayer from "@/hooks/useYouTubePlayer";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const api_endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function Watch() {
  const searchParams = useSearchParams();
  const { v: video_id, t: startTime } = Object.fromEntries(searchParams);
  const url = `https://www.youtube.com/embed/${video_id}`;
  const playerElementId = "youtube-player";

  const playerState = useYouTubePlayer(video_id, playerElementId, startTime);

  const updateBackend = useCallback(
    async (currentPlayerState) => {
      console.log(video_id, currentPlayerState);
      try {
        const headers = { "content-type": "application/json" };
        const response = await fetch(api_endpoint, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ ...currentPlayerState, video_id: video_id }),
        });
        if (!response.ok) {
          console.log(await response.text())
          console.error("Failed to add data to backend ", response.status);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [video_id],
  );

  useEffect(() => {
    if (!playerState.isReady) return;
    if (playerState.videoStateLabel === "CUED") return;
    updateBackend(playerState);
  }, [playerState]);

  return (
    <>
      <div className="w-[50vw] mx-auto h-full px-5">
        <div id="video-container" className="relative w-full h-full">
          <div className="relative w-full pt-[56.25%] bg-black">
            <div
              id={playerElementId}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
        <h1>
          watch {playerState?.videoData.title} -{" "}
          {playerState?.isReady ? "Ready" : "Loading"}
        </h1>
        <div>{playerState && JSON.stringify(playerState)}</div>
      </div>
    </>
  );
}
