import classNames from "classnames";
import Image from "next/image";
import styles from "@components/SideBar/SideBar.module.css";

export default function SideBar() {
    return (
        
        <div className={classNames(styles.mainSidebar, styles.sidebar)}>
        <div className={styles.sidebarPersonal}>
            <p className={styles.sidebarPersonalName}> <a className={styles.linkPersonalName} href="http:/not-found" >Sergey.Ivanov</a></p>
            <div className={styles.sidebarIcon}>
                <svg>
                    <use href="/image/icon/sprite.svg#logout" />
                </svg>
            </div>
        </div>
        <div className={styles.sidebarBlock}>
            <div className={styles.sidebarList}>
                <div className={styles.sidebarItem}>
                    <a className={styles.sidebarLink} href="#">
                        <Image
                            className={styles.sidebarImg}
                            src="/image/playlist01.png"
                            alt="day's playlist"
                            width={250}
                            height={150}
                        />
                    </a>
                </div>
                <div className={styles.sidebarItem}>
                    <a className={styles.sidebarLink} href="#">
                        <Image
                            className={styles.sidebarImg}
                            src="/image/playlist02.png"
                            alt="day's playlist"
                            width={250}
                            height={150}
                        />
                    </a>
                </div>
                <div className={styles.sidebarItem}>
                    <a className={styles.sidebarLink} href="#">
                        <Image
                            className={styles.sidebarImg}
                            src="/image/playlist03.png"
                            alt="day's playlist"
                            width={250}
                            height={150}
                        />
                    </a>
                </div>
            </div>
        </div>
    </div>
    )
}