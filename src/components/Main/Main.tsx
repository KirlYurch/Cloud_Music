"use client";
import styles from "@components/Main/Main.module.css";
import Nav from "@components/Nav/Nav";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import SideBar from "@components/SideBar/SideBar";
import Bar from "@components/Bar/Bar";

export default function Main() {
  return (
    <>
      <main className={styles.main}>
        <Nav />
        <CenterBlock />
        <SideBar />
      </main>
      <Bar />
      <footer className={styles.footer} />
    </>
  );
}
