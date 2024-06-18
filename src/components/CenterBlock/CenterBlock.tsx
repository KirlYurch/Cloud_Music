import classNames from "classnames";
import styles from "@components/CenterBlock/CenterBlock.module.css";
import BlockFilter from "@components/BlockFilter/BlockFilter";
import ContentPlayList from "@components/ContentPlayList/ContentPlayList";
import { useAppDispatch } from "@/hooks";
import { setFilter } from "@/store/features/playlistSlice";

export default function CenterBlock() {
  const dispatch = useAppDispatch();
  return (
    <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
      <div className={classNames(styles.centerblockSearch, styles.search)}>
        <svg className={styles.searchSvg}>
          <use href="/image/icon/sprite.svg#icon-search" />
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
          onChange={(ev) => {
            dispatch(setFilter({ searchString: ev.target.value }));
          }}
        />
      </div>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <BlockFilter />
      <div
        className={classNames(
          styles.centerblockContent,
          styles.playlistContent
        )}
      >
        <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use href="/image/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>

        <ContentPlayList />
      </div>
    </div>
  );
}
