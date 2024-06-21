"use client";
import classNames from "classnames";
import styles from "@components/ContentPlayList/ContentPlayList.module.css";
import PlayListItem from "@components/PlayListItem/PlayListItem";
import { trackType } from "@/types";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setPlaylist } from "@/store/features/playlistSlice";
import { RootState } from "@/store/store";
export default function ContentPlayList() {
  const dispatch = useAppDispatch();

  // Состояние для загрузки
  const [isLoading, setIsLoading] = useState(true);

  // получаем треки из API
  const [trackList, setTrackList] = useState<trackType[]>([]);
  useEffect(() => {
    getTracks().then((data) => {
      setTrackList(data);
      setIsLoading(false); // Устанавливаем isLoading в false после загрузки треков
    });
  }, []);

  useEffect(() => {
    dispatch(setPlaylist({ tracks: trackList }));
  }, [dispatch, trackList]);

  // получаем отфильтрованный плейлист из Redux
  const filterPlaylist = useAppSelector(
    (state: RootState) => state.playlist.filterPlaylist
  );

  if (isLoading) {
    return (
      <div className={styles.loadingMessage}>
        Загрузка треков...
        <use href="https://tenor.com/ru/view/cat-jam-dance-cute-head-shaking-gif-17955335" />
      </div>
    );
  }
  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      {filterPlaylist.length > 0 ? (
        filterPlaylist.map((track) => (
          <PlayListItem
            key={track.id}
            track={track}
            playlist={filterPlaylist}
          />
        ))
      ) : (
        <div className={styles.noTracksMessage}>Треки не найдены</div>
      )}
    </div>
  );
}
