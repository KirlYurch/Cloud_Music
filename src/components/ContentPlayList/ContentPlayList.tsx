// "use client";
import classNames from "classnames";
import styles from "@components/ContentPlayList/ContentPlayList.module.css";
import PlayListItem from "@components/PlayListItem/PlayListItem";
import { getTracks } from "@/api/tracks";
import { trackType } from "../types";


async function ContentPlayList() {
    let playlistArray: trackType[];
    try {
        playlistArray = await getTracks();
    }
    catch (error) {
        console.error('Ошибка при получении списка воспроизведения', error);
        playlistArray = [];
    }
    return (
        <div className={classNames(styles.contentPlaylist, styles.playlist)}>
            {playlistArray?.map((item, index) => (
                <PlayListItem key={index} item={item} />
            ))}
        </div>
    )
}
export default ContentPlayList