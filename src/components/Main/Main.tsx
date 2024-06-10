"use client"
import styles from "@components/Main/Main.module.css";
import Nav from "@components/Nav/Nav";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import SideBar from "@components/SideBar/SideBar";
import Bar from "@components/Bar/Bar";
import { useState } from "react";
import { trackType } from "@/types";

export default function Main() {
    const [track,] = useState<trackType | null>(null);
    return (
        <>
            <main className={styles.main}>
                <Nav />
                <CenterBlock />
                <SideBar />
            </main>
            {/* {track ? <Bar /> : ""} */}
            <Bar />
            <footer className={styles.footer} />
        </>
    )
}