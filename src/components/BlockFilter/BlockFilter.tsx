"use client";
import classNames from "classnames";
import styles from "@components/BlockFilter/BlockFilter.module.css";
import { useState, useEffect } from "react";
import FilterItem from "@components/FilterItem/FilterItem";
import { years } from "./data";

// Определяем тип для элементов фильтра
type FilterItemType = {
  id: number;
  name: string;
};

type TrackData = {
  author: string;
  genre: string;
};

export default function BlockFilter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [authors, setAuthors] = useState<FilterItemType[]>([]);
  const [genres, setGenres] = useState<FilterItemType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://skypro-music-api.skyeng.tech/catalog/track/all/");
        if (!res.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data: TrackData[] = await res.json();

        // Пример преобразования данных
        const authorSet = new Set<string>();
        const genreSet = new Set<string>();

        data.forEach((item: TrackData) => {
          authorSet.add(item.author);
          genreSet.add(item.genre);
        });

        const authorsArray = Array.from(authorSet).map((author, index) => ({ id: index + 1, name: author }));
        const genresArray = Array.from(genreSet).map((genre, index) => ({ id: index + 1, name: genre }));

        setAuthors(authorsArray);
        setGenres(genresArray);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }

    fetchData();
  }, []);

  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (newFilter === prev ? null : newFilter));
  }

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={styles.filterWrapper}>
        <div
          onClick={() => handleFilterClick("author")}
          className={`${
            activeFilter === "author"
              ? classNames(
                  styles.filterButtonActive,
                  styles.buttonAuthor,
                  styles._btnTextActive
                )
              : classNames(
                  styles.filterButton,
                  styles.buttonAuthor,
                  styles._btnText
                )
          } `}
        >
          Исполнителю
        </div>
        {activeFilter === "author" ? <FilterItem FilterList={authors} /> : ""}
      </div>
      <div className={styles.filterWrapper}>
        <div
          onClick={() => handleFilterClick("year")}
          className={`${
            activeFilter === "year"
              ? classNames(
                  styles.filterButtonActive,
                  styles.buttonYear,
                  styles._btnTextActive
                )
              : classNames(
                  styles.filterButton,
                  styles.buttonYear,
                  styles._btnText
                )
          } `}
        >
          Году выпуска
        </div>
        {activeFilter === "year" ? <FilterItem FilterList={years} /> : ""}
      </div>
      <div className={styles.filterWrapper}>
        <div
          onClick={() => handleFilterClick("genre")}
          className={`${
            activeFilter === "genre"
              ? classNames(
                  styles.filterButtonActive,
                  styles.buttonGenre,
                  styles._btnTextActive
                )
              : classNames(
                  styles.filterButton,
                  styles.buttonGenre,
                  styles._btnText
                )
          } `}
        >
          Жанру
        </div>
        {activeFilter === "genre" ? <FilterItem FilterList={genres} /> : ""}
      </div>
    </div>
  );
}
