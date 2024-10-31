import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilter, setPlaylist } from "@/store/features/playlistSlice";
import { trackType } from "@/types";
import { RootState } from "@/store/store";
import PlayListItem from "@components/PlayListItem/PlayListItem";

type ContentPlayListProps = {
  tracks: trackType[];
  isLoading: boolean;
  error: string | null;
};

export default function ContentPlayList({
  tracks,
  isLoading,
  error,
}: ContentPlayListProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlaylist({ tracks }));
  }, [dispatch, tracks]);

  // получаем отфильтрованный плейлист из Redux
  const filterPlaylist = useAppSelector(
    (state: RootState) => state.playlist.filterPlaylist
  );

  // useCallback для функции сортировки треков
  const sortTracks = useCallback(
    (order: string) => {
      dispatch(setFilter({ order }));
    },
    [dispatch]
  );

  // useMemo для мемоизации отфильтрованного плейлиста
  const memoizedPlaylist = useMemo(() => filterPlaylist, [filterPlaylist]);

  if (isLoading) {
    return <div className="loadingMessage">Загрузка треков...</div>;
  }

  if (error) {
    return <div className="errorMessage">{error}</div>;
  }

  return (
    <div className="contentPlaylist playlist">
      {memoizedPlaylist.length > 0 ? (
        memoizedPlaylist.map((track) => (
          <PlayListItem
            key={track._id}
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
