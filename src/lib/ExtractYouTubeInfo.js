export default function ExtractYouTubeInfo(url) {
  const videoIdMatch = url.match(/[?&]v=([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const timeMatch = url.match(/[?&]t=(\d+)/);
  const time = timeMatch ? parseInt(timeMatch[1]) : 0;

  return { videoId, time };
}
