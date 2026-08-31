// -----------------------------------------------------------------------------
// AudioPlayer — HTML5 <audio> with native controls plus a custom play/pause
// button. Used for the cooking-tips guide on the Home page.
// -----------------------------------------------------------------------------
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

function AudioPlayer({ audioUrl, title = 'Cooking tips' }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const el = audioRef.current;
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
    <div className={styles.audio}>
      <span className={styles.audioIcon} aria-hidden="true">🎧</span>
      <div className={styles.audioBody}>
        <h4>{title}</h4>
        <audio
          ref={audioRef}
          controls
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={audioUrl} type="audio/mpeg" />
          {/* Fallback for unsupported browsers */}
          <span className={styles.fallback}>Your browser does not support the audio element.</span>
        </audio>
      </div>
      <button className={styles.ctrlBtn} onClick={togglePlay}>
        {playing ? '❚❚ Pause' : '► Play'}
      </button>
    </div>
  );
}

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};


export default AudioPlayer;
