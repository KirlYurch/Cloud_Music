
import classNames from "classnames";
import styles from "@components/BarLikeBlock/BarLikeBlock.module.css";
import { trackType } from "@/types";
import { useLikedTracks } from "@/likes";

type LikeBlockProps = { track: trackType };

export default function BarLikeBlock({ track }: LikeBlockProps) {
  
  const { isLiked, handleLike } = useLikedTracks(track);

  return (
    <div className={classNames(styles.trackPlayLike, styles._btnIcon)}>
      <svg className={styles.trackPlayLikeSvg} onClick={handleLike}>
        {isLiked ? (
          <use href="/image/icon/sprite.svg#icon-like" />
        ) : (
          <use href="/image/icon/sprite.svg#icon-dislike" />
        )}
      </svg>
    </div>
  );
}
