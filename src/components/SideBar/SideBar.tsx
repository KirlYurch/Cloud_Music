import classNames from "classnames";
import Image from "next/image";
import styles from "@components/SideBar/SideBar.module.css";
import Link from "next/link";

export default function SideBar() {
    return (
        <div className={classNames(styles.mainSidebar, styles.sidebar)}>
            <div className={styles.sidebarPersonal}>
            <Link  className={styles.linkPersonalName} href="../not-found">
                <p className={styles.sidebarPersonalName}>
                   Sergey.Ivanov 
                </p>
                <div className={styles.sidebarIcon}>
                    <svg>
                        <use href="/image/icon/sprite.svg#logout" />
                    </svg>
                </div>
                </Link>
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
