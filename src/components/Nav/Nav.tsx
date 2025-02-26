"use client"
import classNames from "classnames";
import Image from "next/image";
import styles from "@components/Nav/Nav.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Nav() {
    const [isOpened, setIsOpened] = useState(false);
    const [menuMaxHeight, setMenuMaxHeight] = useState("0px");
    const menuRef = useRef<HTMLDivElement>(null);

    function togglePopUp() {
        setIsOpened((prev) => !prev);
    }

    useEffect(() => {
        if (menuRef.current) {
            setMenuMaxHeight(isOpened ? `${menuRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpened]);

    return (
        <nav className={classNames(styles.mainNav, styles.nav)}>
            <div className={classNames(styles.navLogo, styles.logo)}>
            <Link href="/" className={styles.menuHome}>
                <Image
                    alt="Логотип"
                    width={113}
                    height={17}
                    className={styles.logoImage}
                    src="/image/logo.png"
                />
                 </Link>
            </div>
            <div
                onClick={togglePopUp}
                className={classNames(styles.navBurger, styles.burger)}
                data-testid="burger-button" 
            >
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
            </div>

            <div
                ref={menuRef}
                className={classNames(styles.navMenu, { [styles.navMenuOpen]: isOpened })}
                style={{ maxHeight: menuMaxHeight }}
                data-testid="menu" 
            >
                <ul className={styles.menuList}>
                    <li className={styles.menuItem}>
                        <Link href="/" className={styles.menuLink}>
                            Главное
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="../favorite" className={styles.menuLink}>
                            Мой плейлист
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="../signin" className={styles.menuLink}>
                            Войти
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}