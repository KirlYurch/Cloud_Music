import Bar from "@components/Bar/Bar";
import Nav from "@components/Nav/Nav";
import SideBar from "@components/SideBar/SideBar";
import styles from "./layout.module.css";
import { ReactNode } from "react";

type TypeProps = {
  children: ReactNode;
};

function TrackLayout({ children }: TypeProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          {children}
          <SideBar />
        </main>
        <Bar />
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
export default TrackLayout;
