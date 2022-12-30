import { act, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { renderWithProviders } from 'app/store/renderWithProviders';
import Servers from './';

test('Servers should render table', async () => {
  const allNetworkHandlers = [
    rest.get('https://playground.tesonet.lt/v1/servers', (req, res, ctx) => {
      return res(ctx.json([{ name: 'Germany #90', distance: 1412 }]), ctx.delay(100));
    }),
  ];
  const server = setupServer(...allNetworkHandlers);
  server.listen();

  act(() => {
    renderWithProviders(<Servers />);
  });
  expect(await screen.findByRole('table')).toBeInTheDocument();
  server.resetHandlers();
  server.close();
});

test('Servers should display no data when serverListData === 0', async () => {
  const allNetworkHandlers = [
    rest.get('https://playground.tesonet.lt/v1/servers', (req, res, ctx) => {
      return res(ctx.json([]), ctx.delay(100));
    }),
  ];
  const server = setupServer(...allNetworkHandlers);
  server.listen();
  act(() => {
    renderWithProviders(<Servers />);
  });
  expect(await screen.findByTestId('servers-no-data')).toBeInTheDocument();
  server.resetHandlers();
  server.close();
});

test('Servers should display error if isServersListDataError === true', async () => {
  const allNetworkHandlers = [
    rest.get('https://playground.tesonet.lt/v1/servers', (req, res, ctx) => {
      return res.networkError('some network error');
    }),
  ];
  const server = setupServer(...allNetworkHandlers);
  server.listen();

  act(() => {
    renderWithProviders(<Servers />);
  });

  expect(await screen.findByTestId('servers-error')).toBeInTheDocument();
  server.resetHandlers();
  server.close();
});
