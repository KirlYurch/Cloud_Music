import styles from "@components/FilterItem/FilterItem.module.css";
import { useAppDispatch } from "@/hooks";
import { setFilter } from "@/store/features/playlistSlice";

type FilterList = { id: number, name: string };
type FilterItemProps = {
  FilterList: FilterList[]
};

export default function FilterItem({ FilterList }: FilterItemProps) {
  const dispatch = useAppDispatch();

  function handleItemClick(name: string) {
    dispatch(setFilter({ author: [name] }));
  }

  return (
    <div className={styles.filterWrapper}>
      <ul className={styles.filterList}>
        {FilterList?.map((item) => (
          <li 
            className={styles.li} 
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
