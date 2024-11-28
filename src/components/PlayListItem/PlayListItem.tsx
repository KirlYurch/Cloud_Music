import classNames from "classnames";
import styles from "@components/PlayListItem/PlayListItem.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";
import { RootState } from "../../store/store";
import { useLikeTrack } from "@/likes";
import Modal from "@components/ModalWindow/Modal";

type PlayListItemProps = { playlist: trackType[]; track: trackType };

export default function PlayListItem({ track, playlist }: PlayListItemProps) {
  const { isLiked, handleLike, showModal, setShowModal } = useLikeTrack(track);
  const dispatch = useAppDispatch();
  const { name, author, album } = track;
  const time = track.duration_in_seconds;
  const { isPlaying, currentTrack } = useAppSelector(
    (state: RootState) => state.playlist
  );

  function handleClick() {
    dispatch(setCurrentTrack({ currentTrack: track, playlist })); // Обновляем здесь
  }

  const isActiveTrack = track._id === currentTrack?._id;
  let minutes = Math.floor(time / 60);
  let seconds = (time % 60).toString().padStart(2, "0");

  const closeModal = () => setShowModal(false);

  return (
    <div
      onClick={handleClick}
      className={classNames(styles.playlistItem, {
        [styles.activeTrack]: isActiveTrack,
      })}
    >
      <div className={classNames(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isActiveTrack ? (
              <div
                className={classNames(styles.trackImagePlaying, {
                  [styles.trackAnimation]: isPlaying,
                })}
              ></div>
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use href="/image/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>
          <div className={styles.trackTitleText}>
            <div className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </div>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <div className={styles.trackAuthorLink}>{author}</div>
        </div>
        <div className={styles.trackAlbum}>
          <div className={styles.trackAlbumLink}>{album}</div>
        </div>
        <div className={styles.trackTime}>
          <svg
            className={classNames(styles.trackTimeSvg, {
              [styles.trackTimeSvgLiked]: isLiked,
            })}
            onClick={(event) => {
              event.stopPropagation(); 
              handleLike(event); 
            }}
          >
            <use href="/image/icon/sprite.svg#icon-like" />
          </svg>
          <span
            className={styles.trackTimeText}
          >{`${minutes}:${seconds}`}</span>
        </div>
      </div>
      <Modal show={showModal} onClose={closeModal} />
    </div>
  );
}
