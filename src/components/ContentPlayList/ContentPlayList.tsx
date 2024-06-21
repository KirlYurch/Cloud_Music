import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilter, setPlaylist } from "@/store/features/playlistSlice";
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";
import { RootState } from "@/store/store";
import PlayListItem from "@components/PlayListItem/PlayListItem";

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

  // useCallback для функции сортировки треков
  const sortTracks = useCallback((order: string) => {
    dispatch(setFilter({ order }));
  }, [dispatch]);

  // useMemo для мемоизации отфильтрованного плейлиста
  const memoizedPlaylist = useMemo(() => filterPlaylist, [filterPlaylist]);

  if (isLoading) {
    return (
      <div className="loadingMessage">
        Загрузка треков...
        <use href="https://tenor.com/ru/view/cat-jam-dance-cute-head-shaking-gif-17955335" />
      </div>
    );
  }
  return (
    <div className="contentPlaylist playlist">
      {memoizedPlaylist.length > 0 ? (
        memoizedPlaylist.map((track) => (
          <PlayListItem
            key={track.id}
            track={track}
            playlist={memoizedPlaylist}
          />
        ))
      ) : (
        <div className="noTracksMessage">Треки не найдены</div>
      )}
    </div>
  );
}
