"use client";
import classNames from "classnames";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useState } from "react";
import { setFilter } from "@/store/features/playlistSlice";
import ContentPlayList from "@components/ContentPlayList/ContentPlayList";


export default function FavoriteTrackPage() {
  const tracks = useAppSelector((state) => state.playlist.likedTracks);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <svg className={styles.searchSvg}>
        <use href="/image/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        onChange={(ev) => {
          dispatch(setFilter({ searchString: ev.target.value }));
        }}
      />
    </div>
  <h2 className={styles.heading}>Мой плейлист</h2>
  <div
    className={classNames(
      styles.centerblockContent,
      styles.playlistContent
    )}
  >
    <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
      <div className={classNames(styles.playlistTitleCol, styles.col01)}>
        Трек
      </div>
      <div className={classNames(styles.playlistTitleCol, styles.col02)}>
        Исполнитель
      </div>
      <div className={classNames(styles.playlistTitleCol, styles.col03)}>
        Альбом
      </div>
      <div className={classNames(styles.playlistTitleCol, styles.col04)}>
        <svg className={styles.playlistTitleSvg}>
          <use href="/image/icon/sprite.svg#icon-watch" />
        </svg>
      </div>
    </div>

    <ContentPlayList
      tracks={tracks}
      isLoading={isLoading}
      error={error}
    />
  </div>
</div>
   
  )
  
}
