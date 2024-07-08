import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DetailPage from '.';

const mockStore = configureStore([]);

describe('DetailPage Component', () => {
  it('renders loading state correctly', async () => {
    const store = mockStore({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('loader')[0]).toBeInTheDocument();
  });

  it('renders error state correctly', async () => {
    const store = mockStore({
      isLoading: false,
      error: 'An error occurred due to a timeout',
      data: null,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailPage />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText('An error occurred due to a timeout')
    ).toBeInTheDocument();
  });

  it('renders data state correctly', async () => {
    const store = mockStore({
      isLoading: false,
      error: null,
      data: {
        date: '2023-03-09',
        confirmed: 17042722,
        deaths: 101492,
        recovered: 0,
        confirmed_diff: 0,
        deaths_diff: 0,
        recovered_diff: 0,
        last_update: '2023-01-30 23:20:55',
        active: 16941230,
        active_diff: 0,
        fatality_rate: 0.006,
        flagUrl: 'https://flagcdn.com/tr.svg',
        region: {
          iso: 'TUR',
          name: 'Turkey',
          province: '',
          lat: '38.9637',
          long: '35.2433',
          cities: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();

    expect(screen.getByText(/Active Cases/i)).toBeInTheDocument();
  });
});
