"use client";
import ExtractYouTubeInfo from "@/lib/ExtractYouTubeInfo";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function YouTubeUrlForm() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState({ videoId: "", time: 0 });

  const handleUrlChange = (e) => {
    let changeUrl = e.target.value ? e.target.value : "";
    setUrl(changeUrl);
    let { videoId, time } = ExtractYouTubeInfo(changeUrl);
    setVideoData({ videoId: videoId, time: time ? time : "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!videoData.videoId) {
      alert("Please enter a valid YouTube URL");
    }

    redirect(`/watch?v=${videoData.videoId}&t=${videoData.time}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="url"
          className="block text-sm/6 font-medium text-gray-900"
        >
          YouTube Video
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              URL
            </div>
            <input
              id="url"
              name="url"
              onChange={handleUrlChange}
              value={url}
              type="text"
              required
              placeholder="https://www.youtube.com/watch?=..."
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
          <button type="submit">submit</button>
        </div>
      </div>
    </form>
  );
}
