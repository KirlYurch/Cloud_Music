"use client";
import { playlistCategory } from "@/api/playlistCategory";
import { setFilter, setPlaylist } from "@/store/features/playlistSlice";
import classNames from "classnames";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks";

import Nav from "@components/Nav/Nav";
import ContentPlayList from "@components/ContentPlayList/ContentPlayList";
import Bar from "@components/Bar/Bar";
import Link from "next/link";
import { trackType } from "@/types";

type CategoryProps = {
  params: {
    id: string;
  };
};

const Category = ({ params }: CategoryProps) => {
  const dispatch = useAppDispatch();
  const [categoryTracks, setCategoryTracks] = useState<trackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    playlistCategory(params.id)
      .then((response) => {
        setCategoryTracks(response.items);
        dispatch(setPlaylist({ tracks: response.items }));
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке треков");
        setIsLoading(false);
      });
  }, [dispatch, params.id]);

  let title = "";
  switch (params.id) {
    case "1":
      title = "Плейлист дня";
      break;
    case "2":
      title = "100 танцевальных хитов";
      break;
    case "3":
      title = "Инди-заряд";
      break;
    default:
      break;
  }
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
      <h2 className={styles.heading}>{title}</h2>
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

        <ContentPlayList
          tracks={categoryTracks}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Category;
