"use client";
import classNames from "classnames";
import styles from "@components/ContentPlayList/ContentPlayList.module.css";
import PlayListItem from "@components/PlayListItem/PlayListItem";
import { trackType } from "@/types";

import { useEffect, useState } from "react";
import { getTracks } from "@/api/tracks";

export default function ContentPlayList() {
   
    
    // получаем треки из API
    const [trackList, setTrackList] = useState<trackType[]>([]);
    useEffect(() => {
        getTracks().then((data) => setTrackList(data))
    }, [])

    return (
        <div className={classNames(styles.contentPlaylist, styles.playlist)}>
            {trackList?.map((track) => (
                <PlayListItem
                    key={track.id}
                    track={track}
                    playlist={trackList}
                 
                />
            ))}
        </div>
    )
}