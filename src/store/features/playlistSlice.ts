import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  playlist: trackType[];
  currentTrack: null | trackType;
  isPlaying: boolean;
  isShuffled: boolean;
  shuffledPlaylist: trackType[];
  filterOptions: {
    author: string[];
    genre: string[];
    order: string;
    searchString: string;
  };
  filterPlaylist: trackType[];
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
  filterOptions: {
    author: [],
    genre: [],
    order: "По умолчанию",
    searchString: "",
  },
  filterPlaylist: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<SetCurrentTrackType>) => {
      state.currentTrack = action.payload.currentTrack;
      state.playlist = action.payload.playlist;
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
    setPlaylist: (state, action: PayloadAction<{ tracks: trackType[] }>) => {
      state.playlist = action.payload.tracks;
      state.filterPlaylist = action.payload.tracks; // Инициализация filterPlaylist
    },
    setFilter: (
      state,
      action: PayloadAction<{
        author?: string[];
        genre?: string[];
        order?: string;
        searchString?: string;
      }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        genre: action.payload.genre || state.filterOptions.genre,
        order: action.payload.order || state.filterOptions.order,
        searchString:
          action.payload.searchString !== undefined
            ? action.payload.searchString
            : state.filterOptions.searchString,
      };

      // Если строка поиска пуста, сбрасываем фильтрованный плейлист
      if (state.filterOptions.searchString === "" && 
          state.filterOptions.author.length === 0 &&
          state.filterOptions.genre.length === 0) {
        state.filterPlaylist = state.playlist;
        return;
      }

      const filterTracks = [...state.playlist].filter((track) => {
        const hasSearchString = track.name
          .toLowerCase()
          .includes(state.filterOptions.searchString.toLowerCase());
        const hasAuthor =
          state.filterOptions.author.length > 0
            ? state.filterOptions.author.includes(track.author)
            : true;
        const hasGenre =
          state.filterOptions.genre.length > 0
            ? state.filterOptions.genre.includes(track.genre)
            : true;

        return hasSearchString && hasAuthor && hasGenre;
      });

      switch (state.filterOptions.order) {
        case "Сначала новые":
          filterTracks.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
          break;
        case "Сначала старые":
          filterTracks.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );
          break;
        default:
          break;
      }

      state.filterPlaylist = filterTracks;
    },
  },
});

export const {
  setCurrentTrack,
  nextTrack,
  prevTrack,
  setPlay,
  setPause,
  setShuffle,
  setFilter,
  setPlaylist,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
