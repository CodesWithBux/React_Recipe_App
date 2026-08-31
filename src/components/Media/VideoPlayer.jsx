// -----------------------------------------------------------------------------
// VideoPlayer — HTML5 <video> with native controls PLUS a custom play/pause
// button driven by a ref and component state. Includes fallback content for
// browsers that can't play the video.
// -----------------------------------------------------------------------------
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

function VideoPlayer({ videoUrl, title = 'Cooking tutorial' }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false); // tracks play/pause state

  // Custom play/pause toggle (click event + ref control).
  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={styles.player}>
      <div className={styles.head}>
        <h4>{title}</h4>
        <div className={styles.controls}>
          {/* Custom control — label flips on the `playing` state (ternary) */}
          <button className={styles.ctrlBtn} onClick={togglePlay}>
            {playing ? '❚❚ Pause' : '► Play'}
          </button>
        </div>
      </div>
      <video
        ref={videoRef}
        controls
        width="100%"
        poster="/assets/images/video-poster.svg"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback for unsupported browsers */}
        <p className={styles.fallback}>
          Your browser does not support the video tag. You can
          <a href={videoUrl}> download the tutorial</a> instead.
        </p>
      </video>
    </div>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};


export default VideoPlayer;
