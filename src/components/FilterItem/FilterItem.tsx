import React from 'react';
import classNames from 'classnames';
import styles from './FilterItem.module.css';

type FilterItemType = {
  id: number;
  name: string;
};

type FilterItemProps = {
  FilterList: FilterItemType[];
  selectedFilters: string[];
  filterType: string;
  onItemClick: (name: string) => void;
};

const FilterItem: React.FC<FilterItemProps> = ({ FilterList, selectedFilters, filterType, onItemClick }) => {
  return (
    <div className={styles.filterWrapper}>
      <ul className={styles.filterList}>
        {FilterList.map((item) => (
          <li
            key={item.id}
            className={classNames(styles.li, {
              [styles.selected]: selectedFilters.includes(item.name),
            })}
            onClick={() => onItemClick(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterItem;
