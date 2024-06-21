import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './BlockFilter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { useAppDispatch } from '@/hooks';
import { setFilter } from '@/store/features/playlistSlice';

type FilterItemType = {
  id: number;
  name: string;
};

const BlockFilter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [authors, setAuthors] = useState<FilterItemType[]>([]);
  const [genres, setGenres] = useState<FilterItemType[]>([]);
  const [years, setYears] = useState<FilterItemType[]>([
    { id: 1, name: "По умолчанию" },
    { id: 2, name: "Сначала новые" },
    { id: 3, name: "Сначала старые" },
  ]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("По умолчанию");
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://skypro-music-api.skyeng.tech/catalog/track/all/");
        if (!res.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await res.json();

        // Пример преобразования данных
        const authorSet = new Set<string>();
        const genreSet = new Set<string>();
        data.forEach((item: { author: string; genre: string; }) => {
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

  function handleFilterItemClick(filterType: string, name: string) {
    switch (filterType) {
      case 'author':
        const updatedSelectedAuthors = selectedAuthors.includes(name)
          ? selectedAuthors.filter((a) => a !== name)
          : [...selectedAuthors, name];
        setSelectedAuthors(updatedSelectedAuthors);
        dispatch(setFilter({ author: updatedSelectedAuthors }));
        break;
      case 'genre':
        const updatedSelectedGenres = selectedGenres.includes(name)
          ? selectedGenres.filter((g) => g !== name)
          : [...selectedGenres, name];
        setSelectedGenres(updatedSelectedGenres);
        dispatch(setFilter({ genre: updatedSelectedGenres }));
        break;
      case 'year':
        setSelectedYear(name);
        if (name === "По умолчанию") {
          dispatch(setFilter({ order: "По умолчанию" }));
        } else if (name === "Сначала новые") {
          dispatch(setFilter({ order: "Сначала новые" }));
        } else if (name === "Сначала старые") {
          dispatch(setFilter({ order: "Сначала старые" }));
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={styles.filterWrapper}>
        <div
          onClick={() => handleFilterClick("author")}
          className={classNames(
            activeFilter === "author"
              ? styles.filterButtonActive
              : styles.filterButton,
            styles.buttonAuthor,
            styles._btnText
          )}
        >
          Исполнителю 
          {selectedAuthors.length > 0 && (
            <div className={styles.badge}>{selectedAuthors.length}</div>
          )}
        </div>
        {activeFilter === "author" && (
          <FilterItem
            FilterList={authors}
            selectedFilters={selectedAuthors}
            filterType="author"
            onItemClick={(name) => handleFilterItemClick("author", name)}
          />
        )}
      </div>
      <div className={styles.filterWrapper}>
        <div
          onClick={() => handleFilterClick("genre")}
          className={classNames(
            activeFilter === "genre"
              ? styles.filterButtonActive
              : styles.filterButton,
            styles.buttonGenre,
            styles._btnText
          )}
        >
          Жанру 
          {selectedGenres.length > 0 && (
            <div className={styles.badge}>{selectedGenres.length}</div>
          )}
        </div>
        {activeFilter === "genre" && (
          <FilterItem
            FilterList={genres}
            selectedFilters={selectedGenres}
            filterType="genre"
            onItemClick={(name) => handleFilterItemClick("genre", name)}
          />
        )}
      </div>
      <div className={styles.filterWrapper}>
        <div
          onClick={() => handleFilterClick("year")}
          className={classNames(
            activeFilter === "year"
              ? styles.filterButtonActive
              : styles.filterButton,
            styles.buttonYear,
            styles._btnText
          )}
        >
          Году выпуска 
          {selectedYear !== "По умолчанию" && (
            <div className={styles.badge}>{selectedYear}</div>
          )}
        </div>
        {activeFilter === "year" && (
          <FilterItem
            FilterList={years}
            selectedFilters={[selectedYear]}
            filterType="year"
            onItemClick={(name) => handleFilterItemClick("year", name)}
          />
        )}
      </div>
    </div>
  );
};

export default BlockFilter;
