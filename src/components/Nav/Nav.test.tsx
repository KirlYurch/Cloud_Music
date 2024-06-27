import "@testing-library/jest-dom";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Nav from "./Nav";
import ReduxProvider from "@/store/ReduxProvider";

test("Тест на открытие и закрытие меню", () => {
  const { getByTestId } = render(
    <ReduxProvider>
      <Nav />
    </ReduxProvider>
  );
  const burgerButton = getByTestId("burger-button");
  const menu = getByTestId("menu");

  // Проверяем, что меню изначально закрыто
  expect(menu).toHaveStyle("max-height: 0px");

  // Кликаем по бургеру
  fireEvent.click(burgerButton);

  // Проверяем, что после открытия меню стиль max-height изменился
  expect(menu).not.toHaveStyle("max-height: 200px");

  // Кликаем по бургеру снова
  fireEvent.click(burgerButton);

  // Проверяем, что меню снова закрыто
  expect(menu).toHaveStyle("max-height: 0px");
});
