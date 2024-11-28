import "@testing-library/jest-dom";
import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';
import { getTracks } from "../../api/tracks";
import ReduxProvider from "@/store/ReduxProvider";
// Мокаем функцию getTracks
jest.mock('../../api/tracks', () => ({
  getTracks: jest.fn(() => Promise.resolve([])),
}));

test('Отображается сообщение о загрузке', async () => {
    const { findByText } = render(
        <ReduxProvider>
          <Main />
          </ReduxProvider>
      );

  const loadingMessage = await findByText(/Загрузка треков.../i);
  expect(loadingMessage).toBeInTheDocument();
});