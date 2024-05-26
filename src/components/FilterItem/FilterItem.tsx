import styles from "@components/FilterItem/FilterItem.module.css";
type FilterList = { id: number, name: string };
type FilterItemProps = {
  FilterList: FilterList[]
};

export default function FilterItem({ FilterList }: FilterItemProps) {
  return (
    <div className={styles.filterWrapper}>
      <ul className={styles.filterList}>
        {FilterList?.map((item) => (
          <li className={styles.li} key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}