"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../signup/page.module.css";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { ChangeEvent, FocusEvent, MouseEvent, useState } from "react";
import { createUser } from "@/store/features/authSlice";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState("Имя не может быть пустым");
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");

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
      case "username":
        setNameDirty(true);
        break;
    }
  }

  function emailHandler(e: ChangeEvent<HTMLInputElement>) {
    handleChange(e);
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  }

  function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
    handleChange(e);
    if (e.target.value.length < 8) {
      setPasswordError("Введите не менее 8 символов");
    } else {
      setPasswordError("");
    }
  }

  function nameHandler(e: ChangeEvent<HTMLInputElement>) {
    handleChange(e);
    if (e.target.value.length < 3) {
      setNameError("Введите не менее 3 символов");
    } else {
      setNameError("");
    }
  }

  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null);
    if (emailError || passwordError || nameError) {
      setEmailDirty(true);
      setPasswordDirty(true);
      setNameDirty(true);
      return;
    }
    try {
      await dispatch(createUser(formData)).unwrap();
      router.push("signin");
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  width={140}
                  height={21}
                  src="/image/logo_modal.png"
                  alt="Логотип"
                />
              </div>
            </a>
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="username"
              placeholder="Имя пользователя"
              onBlur={blurHandler}
              onChange={nameHandler}
            />
            {nameDirty && nameError && (
              <p className={classNames(styles.errorHandler)}>{nameError}</p>
            )}
            <input
              className={classNames(styles.modalInput, styles.passwordFirst)}
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
              className={classNames(styles.modalInput, styles.passwordDouble)}
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
            <button className={styles.modalBtnSignupEnt} onClick={handleSubmit}>
              Зарегистрироваться
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
