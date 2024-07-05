import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  dislikeTrack,
  getFavoriteTracks,
  likeTrack,
} from "./store/features/playlistSlice";
import { trackType } from "./types";
import { deleteFavoriteTracks, favoriteTracks } from "./api/tracks";

export function useInitializeLikedTracks() {
  const dispatch = useAppDispatch();

  const tokens = useAppSelector((state) => state.auth.tokens);
  useEffect(() => {
    if (tokens.access) {
      dispatch(getFavoriteTracks(tokens.access));
    }
  }, [tokens, dispatch]);
}

export function useLikedTracks(track: trackType) {
  const dispatch = useAppDispatch();
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);

  const tokens = useAppSelector((state) => state.auth.tokens);

  const isLiked = likedTracks.includes(track.id);
  async function handleLike(event: React.MouseEvent<HTMLDivElement|SVGSVGElement>) {
    event.stopPropagation();
    if (!tokens.access) return alert("Необходимо авторизоваться");
    const action = isLiked ? deleteFavoriteTracks : favoriteTracks;
    try {
      await action(tokens.access, track.id);
      isLiked
        ? dispatch(dislikeTrack({ id: track.id }))
        : dispatch(likeTrack({ id: track.id }));
    } catch (error) {
      console.log(error)
    }
  }
  return {
    isLiked, handleLike
  }
}
