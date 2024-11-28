"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../signin/page.module.css";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useState } from "react";
import { getTokens, getUser } from "@/store/features/authSlice";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );

  const [error, setError] = useState<string | null>(null); 

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function blurHandler(e: FocusEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  }

  function emailHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: e.target.value,
    }));
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  }

  function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: e.target.value,
    }));
    if (e.target.value.length < 8) {
      setPasswordError("Введите не менее 8 символов");
    } else {
      setPasswordError("");
    }
  }

  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null); 
    if (emailError || passwordError) {
      setEmailDirty(true);
      setPasswordDirty(true);
      return;
    }
    try {
      await Promise.all([
        dispatch(getTokens(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ]);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <div className={styles.modalLogo}>
              <Image
                width={140}
                height={21}
                src="/image/logo_modal.png"
                alt="Логотип"
              />
            </div>

            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
              onBlur={blurHandler}
              onChange={emailHandler}
            />
            {emailDirty && emailError && (
              <p className={classNames(styles.errorHandler1)}>{emailError}</p>
            )}
            <input
              className={classNames(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
              onBlur={blurHandler}
              onChange={passwordHandler}
            />
            {passwordDirty && passwordError && (
              <p className={classNames(styles.errorHandler2)}>
                {passwordError}
              </p>
            )}
            <button className={styles.modalBtnEnter} onClick={handleSubmit}>
              Войти
            </button>
            <Link href="/signup" className={styles.modalBtnSignup}>
              Зарегистрироваться
            </Link>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
