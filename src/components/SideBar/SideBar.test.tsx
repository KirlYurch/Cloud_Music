

import ReduxProvider from '@/store/ReduxProvider';
import "@testing-library/jest-dom";

import React from 'react';
import { render } from '@testing-library/react';
import SideBar from '@components/SideBar/SideBar';

describe('Компонент Sidebar', () => {
  it('отображает sidebar с персональной информацией', () => {
    const { getByText } = render(
        <ReduxProvider><SideBar />
       </ReduxProvider>);

    // Проверяем наличие имени пользователя 
    expect(getByText('Sergey.Ivanov')).toBeInTheDocument();
  });
});