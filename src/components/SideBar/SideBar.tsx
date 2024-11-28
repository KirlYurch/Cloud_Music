"use client";
import classNames from "classnames";
import Image from "next/image";
import styles from "@components/SideBar/SideBar.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useInitializeLikedTracks } from "@/likes";
import { logout } from "@/store/features/authSlice";

export default function SideBar() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.auth.user?.username);
  useInitializeLikedTracks();

  const exitLogout = () => {
    dispatch(logout());
  };
  
  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
      <div className={styles.sidebarPersonal}>
        {userName ? (
          <>
            <p className={styles.sidebarPersonalName}>{userName}</p>
            <Link className={styles.linkPersonalName} href="../signin">
              <div className={styles.sidebarIcon} onClick={exitLogout} >
                <svg>
                  <use href="/image/icon/sprite.svg#logout" />
                </svg>
              </div>
            </Link>
          </>
        ) : (
          <>
            <p className={styles.sidebarPersonalName2}>Guest</p>
          </>
        )}
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/category/1">
              <Image
                className={styles.sidebarImg}
                src="/image/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/category/2">
              <Image
                className={styles.sidebarImg}
                src="/image/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/category/3">
              <Image
                className={styles.sidebarImg}
                src="/image/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
