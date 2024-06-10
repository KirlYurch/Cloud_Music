

import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  playlist: trackType[];
  currentTrack: null | trackType;
  isPlaying: boolean;
  isShuffled: boolean;
  shuffledPlaylist: trackType[];
};

type SetCurrentTrackType = {
  currentTrack: trackType;
  playlist: trackType[];
};

const initialState: PlaylistStateType = {
  playlist: [],
  currentTrack: null,
  isPlaying: false,
  isShuffled: false,
  shuffledPlaylist: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<SetCurrentTrackType>) => {
      state.currentTrack = action.payload.currentTrack;
      state.playlist = action.payload.playlist;
      // state.shuffledPlaylist = [...action.payload.playlist].sort(() => 0.5 - Math.random()
      // );
    },
    nextTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = currentTrackIndex + 1;
      if (playlist[newTrack]) {
        state.currentTrack = playlist[newTrack];
      }
      state.isPlaying = true;
    },
    prevTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = currentTrackIndex - 1;
      if (playlist[newTrack]) {
        state.currentTrack = playlist[newTrack];
      }
      state.isPlaying = true;
    },
    setPlayList: (state, action) => {
      state.currentTrack = action.payload;
    },
    setPlay: (state) => {
      state.isPlaying = true;
    },
    setPause: (state) => {
      state.isPlaying = false;
    },
    setShuffle: (state, action) => {
      state.isShuffled = action.payload;
      if (action.payload) {
        const playList = [...state.playlist];
        playList.sort(() => Math.random() - 0.5);
        state.shuffledPlaylist = playList;
      }
    },
  },
});

export const {
  setCurrentTrack,
  nextTrack,
  prevTrack,
  setPlayList,
  setPlay,
  setPause,
  setShuffle,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
