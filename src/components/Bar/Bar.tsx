"use client";
import classNames from "classnames";
import styles from "@components/Bar/Bar.module.css";
import BarVolumeBlock from "@components/BarVolumeBlock/BarVolumeBlock";
import { useEffect, useRef, useState } from "react";
import { trackType } from "@components/types";
import ProgressBar from "@components/ProgressBar/ProgressBar";

type BarProps = {
  track: trackType | null;
};

export default function Bar({ track }: BarProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const duration = audioRef.current?.duration || 0;
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (track) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    const setTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };
    audio?.addEventListener("timeupdate", setTime);
    return () => {
      audio?.removeEventListener("timeupdate", setTime);
    };
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const progressTrack = (value: number) => {
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const handleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
      setIsLoop((prev) => !prev);
    }
  };

  const handleVolume = (value: number) => {
    setVolume(value / 100);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio src={track?.track_file} ref={audioRef}></audio>
        <div className={styles.barTime}>
          {track && `${formatTime(currentTime)} / ${formatTime(duration)}`}
        </div>
        <ProgressBar
          value={currentTime}
          max={duration}
          onChange={progressTrack}
        />
        <div className={styles.barPlayerProgress}></div>

        <div className={styles.barPlayerBlock}>
          <div className={classNames(styles.barPlayer, styles.player)}>
            <div className={styles.playerControls}>
              <div
                onClick={() => alert(`Эта функция пока недоступна`)}
                className={styles.playerBtnPrev}
              >
                <svg className={styles.playerBtnPrevSvg}>
                  <use href="/image/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div
                onClick={togglePlay}
                className={classNames(styles.playerBtnPlay, styles._btn)}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  {isPlaying ? (
                    <use href="/image/icon/sprite.svg#icon-pause"></use>
                  ) : (
                    <use href="/image/icon/sprite.svg#icon-play"></use>
                  )}
                </svg>
              </div>
              <div
                onClick={() => alert(`Еще не реализовано(`)}
                className={styles.playerBtnNext}
              >
                <svg className={styles.playerBtnNextSvg}>
                  <use href="/image/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                onClick={handleLoop}
                className={classNames(
                  styles.playerBtnRepeat,
                  styles._btnIcon,
                  { [styles.isLoopActive]: isLoop }
                )}
              >
                <svg className={styles.playerBtnRepeatSvg}>
                  {isLoop ? (
                    <use href="/image/icon/sprite.svg#icon-repeatOn" />
                  ) : (
                    <use href="/image/icon/sprite.svg#icon-repeat" />
                  )}
                </svg>
              </div>
              <div
                className={classNames(styles.playerBtnShuffle, styles._btnIcon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use href="/image/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <div
              className={classNames(styles.playerTrackPlay, styles.trackPlay)}
            >
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use href="/image/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    {track?.name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {track?.author}
                  </a>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div
                  className={classNames(styles.trackPlayLike, styles._btnIcon)}
                >
                  <svg className={styles.trackPlayLikeSvg}>
                    <use href="/image/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlayDislike,
                    styles._btnIcon
                  )}
                >
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use href="/image/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <BarVolumeBlock handleVolume={handleVolume} />
        </div>
      </div>
    </div>
  );
}
