import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { ACCESS_TOKEN } from 'app/shared/config/constants';
import Header from './';

test('Header should render and get header inside', () => {
  act(() => {
    render(
      <BrowserRouter>
        <Header isMobileModalOpened setIsMobileModalOpened />
      </BrowserRouter>
    );
  });
  const headerElement = screen.getByRole('header');
  expect(headerElement).toBeInTheDocument();
});

test('Header tries to get accessToken from localStorage', () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  act(() => {
    render(
      <BrowserRouter>
        <Header isMobileModalOpened setIsMobileModalOpened />
      </BrowserRouter>
    );
  });
  expect(window.localStorage.getItem).toHaveBeenCalledWith(ACCESS_TOKEN);
});

test('Header should get accessToken from localStorage only one time', () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  act(() => {
    render(
      <BrowserRouter>
        <Header isMobileModalOpened setIsMobileModalOpened />
      </BrowserRouter>
    );
  });
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
});
