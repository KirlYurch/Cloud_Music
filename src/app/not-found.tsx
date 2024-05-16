import Link from "next/link";
import styles from "../app/not-found.module.css";

export default function NotFound() {
  return (
      <div className={styles.Div404}>
        <h1 className={styles.H1404}>404</h1>
        <p className={styles.P1404}>
          Извините, мы не смогли найти эту страницу ¯\_(ツ)_/¯
        </p>
        <p className={styles.P2404}>
          Но не волнуйтесь, на нашей домашней странице вы можете найти множество
          других вещей.
        </p>
        <Link href="/" className={styles.linkStyled404}>
          Вернуться на главную
        </Link>
      </div>
  );
}
