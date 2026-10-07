import { useState } from 'react';

/** Poster image that swaps to the embedded YouTube player when clicked. */
export default function VideoThumbnail({ videoId, poster, title = 'YouTube video player', imgProps = {} }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="h-full w-full" style={{ animation: 'videoFadeIn 0.5s ease' }}>
        <iframe
          className="video-frame"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="thumbnail-btn" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
      <img
        src={poster}
        alt=""
        className="transform hover:scale-110 transition duration-500 ease-in-out"
        {...imgProps}
      />
    </button>
  );
}
