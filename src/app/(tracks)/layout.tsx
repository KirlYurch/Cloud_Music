"use client";
import Bar from "@components/Bar/Bar";
import Nav from "@components/Nav/Nav";
import SideBar from "@components/SideBar/SideBar";
import styles from "./layout.module.css";
import { ReactNode, useEffect, useState } from "react";
import { getTracks } from "@/api/tracks";
import { useAppDispatch } from "@/hooks";
import { setAllTracks } from "@/store/features/playlistSlice";

type TypeProps = {
  children: ReactNode;
};

function TrackLayout({ children }: TypeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getTracks()
      .then((data) => {
        dispatch(setAllTracks(data.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке треков");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          {isLoading ? "Loading" : children}
          <SideBar />
        </main>
        <Bar />
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
export default TrackLayout;
