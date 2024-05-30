"use client";
import classNames from "classnames";
import styles from "@components/ContentPlayList/ContentPlayList.module.css";
import PlayListItem from "@components/PlayListItem/PlayListItem";
import { getTracks } from "@/api/tracks";
import { trackType } from "../types";

type ContentPlayListProps = {
    trackList: trackType[];
    setTrack: (param: trackType) => void;
}

export default function ContentPlayList({ setTrack, trackList }: ContentPlayListProps) {
   
    return (
        <div className={classNames(styles.contentPlaylist, styles.playlist)}>
            {trackList?.map((track) => (
                <PlayListItem 
                key={track.id} 
                setTrack={() => setTrack(track)}
                name={track.name}
                author={track.author}
                album={track.album}
                time={track.duration_in_seconds}
                />
            ))}
        </div>
    )
}