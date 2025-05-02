"use client"

import { useSearchParams } from "next/navigation";

export default function Watch() {
    const searchParams = useSearchParams()
    const {v: video_id} = Object.fromEntries(searchParams)
    const url =`https://www.youtube.com/embed/${video_id}`
    console.log(video_id)
  return <>
            <h1>this is the watch page</h1>
            <div>
                <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
  </>;
};
