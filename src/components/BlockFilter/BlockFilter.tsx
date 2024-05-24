"use client";
import classNames from "classnames";
import styles from "@components/BlockFilter/BlockFilter.module.css";
import { useState } from "react";
import { authors, genres, years } from "./data";
import FilterItem from "@components/FilterItem/FilterItem";

export default function FilterBlock() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
