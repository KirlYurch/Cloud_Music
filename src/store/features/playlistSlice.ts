import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { trackType } from "@/types";

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
    },
    nextTrack: (state) => {
      const playlist = state.isShuffled ? state.shuffledPlaylist : state.playlist;
      const currentTrackIndex = playlist.findIndex((track) => track.id === state.currentTrack?.id);
      const newTrack = currentTrackIndex + 1;
      if (playlist[newTrack]) {
        state.currentTrack = playlist[newTrack];
      }
      state.isPlaying = true;
    },
    prevTrack: (state) => {
      const playlist = state.isShuffled ? state.shuffledPlaylist : state.playlist;
      const currentTrackIndex = playlist.findIndex((track) => track.id === state.currentTrack?.id);
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

      let filterTracks = [...state.playlist];

      // Применяем фильтрацию по исполнителям
      if (state.filterOptions.author.length > 0) {
        filterTracks = filterTracks.filter((track) =>
          state.filterOptions.author.includes(track.author)
        );
      }

      // Применяем фильтрацию по жанрам
      if (state.filterOptions.genre.length > 0) {
        filterTracks = filterTracks.filter((track) =>
          state.filterOptions.genre.includes(track.genre)
        );
      }

      // Применяем сортировку по дате релиза в зависимости от выбранного порядка
      if (state.filterOptions.order !== "По умолчанию") {
        filterTracks.sort((a, b) => {
          const dateA = new Date(a.release_date).getTime();
          const dateB = new Date(b.release_date).getTime();
          if (state.filterOptions.order === "Сначала новые") {
            return dateB - dateA;
          } else if (state.filterOptions.order === "Сначала старые") {
            return dateA - dateB;
          }
          return 0;
        });
      }

      // Применяем фильтрацию по строке поиска
      if (state.filterOptions.searchString) {
        const searchLower = state.filterOptions.searchString.toLowerCase();
        filterTracks = filterTracks.filter(
          (track) =>
            track.name.toLowerCase().includes(searchLower) ||
            track.author.toLowerCase().includes(searchLower) ||
            track.genre.toLowerCase().includes(searchLower)
        );
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