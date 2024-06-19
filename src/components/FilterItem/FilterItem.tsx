import styles from "@components/FilterItem/FilterItem.module.css";
import { useAppDispatch } from "@/hooks";
import { setFilter } from "@/store/features/playlistSlice";
import { useState } from "react";

type FilterList = { id: number, name: string };
type FilterItemProps = {
  FilterList: FilterList[]
};

export default function FilterItem({ FilterList }: FilterItemProps) {
  const dispatch = useAppDispatch();
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  function handleItemClick(name: string) {
    const updatedSelectedAuthors = selectedAuthors.includes(name)
      ? selectedAuthors.filter(author => author !== name)
      : [...selectedAuthors, name];
    
    setSelectedAuthors(updatedSelectedAuthors);
    dispatch(setFilter({ author: updatedSelectedAuthors }));
  }

  return (
    <div className={styles.filterWrapper}>
      <ul className={styles.filterList}>
        {FilterList?.map((item) => (
          <li 
            className={`${styles.li} ${selectedAuthors.includes(item.name) ? styles.selected : ""}`} 
            key={item.id}
            onClick={() => handleItemClick(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
