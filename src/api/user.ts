import { SignUpFormType, SignInFormType } from "@/types";

export async function fetchUser ({email, password} : SignInFormType) {
    const response = await fetch("https://skypro-music-api.skyeng.tech/user/login/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
    },
    });
    if (response.status === 500) {
      throw new Error("Ошибка сервера");
    }
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    if (response.status === 401) {
      throw new Error("Пользователь с таким email или паролем не найден");
    }
    const responseData = await response.json();
    return responseData;
  }

  export async function fetchTokens ({email, password} : SignInFormType) {
    const response = await fetch("https://skypro-music-api.skyeng.tech/user/token/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
    },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
    const responseData = await response.json();
    return responseData;
  }


  export async function authorize({
    email,
    password,
    username,
  }: SignUpFormType) {
    const response = await fetch(
      "https://skypro-music-api.skyeng.tech/user/signup/",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 400) {
      throw new Error("Введите корректные данные");
    } else if (response.status === 500) {
      throw new Error("Ошибка сервера. Пожалуйста, обновите страницу и попробуйте еще раз, сейчас или позже");
    } else if (!response.ok) {
      throw new Error("Редка ошибка");
    }
    const responseData = await response.json();
    return responseData;
  }