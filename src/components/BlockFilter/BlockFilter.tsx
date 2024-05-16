import classNames from "classnames";
import styles from "@components/BlockFilter/BlockFilter.module.css";

export default function BlockFilter() {
    return (
        <div className={classNames(styles.centerblockFilter, styles.filter)}>
            <div className={styles.filterTitle}>Искать по:</div>
            <div className={classNames(styles.filterButton, styles.buttonAuthor, styles._btnText)}>
                исполнителю
            </div>
            <div className={classNames(styles.filterButton, styles.buttonYear, styles._btnText)}>
                году выпуска
            </div>
            <div className={classNames(styles.filterButton, styles.buttonGenre, styles._btnText)}>жанру</div>
        </div>
    )
}