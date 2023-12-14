/**
 * Test the HomePage
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import request from 'utils/request';
import AgGrid from '../index';

jest.mock('utils/request');

describe('<AgGrid />', () => {
  beforeEach(() => {
    delete window.location;
  });

  it('demo = false; should render and match the snapshot', async () => {
    window.location = {
      search: '?page=1&sortKey=email&sortType=-1&name=serena',
    };

    const {
      container: { firstChild },
      getByText,
    } = render(<AgGrid />);
    expect(firstChild).toMatchSnapshot();

    await waitFor(() => {
      expect(getByText(/serena/i)).toBeInTheDocument();
    });
  });

  it('demo =false, should sort + paginate', async () => {
    window.location = {
      search: '?page=2&sortKey=name&sortType=1',
    };

    const { getByText } = render(<AgGrid />);

    await waitFor(() => {
      expect(getByText(/brod/i)).toBeInTheDocument();
    });
  });

  it('demo=true; should render and match snapshot', async () => {
    request.mockResolvedValueOnce({
      data: [{ id: 1, firstName: 'Serena', lastName: 'Doe' }],
      pagination: { total: 100 },
      status: 1,
    });
    request.mockResolvedValueOnce({
      data: [{ id: 1, firstName: 'Serena', lastName: 'Doe' }],
      pagination: { total: 100 },
      status: 1,
    });
    request.mockResolvedValueOnce({
      data: [{ id: 1, firstName: 'Serena', lastName: 'Doe' }],
      pagination: { total: 100 },
      status: 1,
    });

    window.location = {
      search: '?page=1&sortKey=email&sortType=-1&name=serena',
    };

    const {
      container: { firstChild },
      getByText,
    } = render(<AgGrid demo />);
    expect(firstChild).toMatchSnapshot();

    await waitFor(() => {
      expect(getByText(/serena/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(request).toHaveBeenCalledTimes(3);
    });
  });

  it('Should show error message sent by api when status is 0', async () => {
    request.mockResolvedValueOnce({
      message: 'Test Error',
      status: 0,
    });

    window.location = {
      search: '?',
    };

    const { getByText } = render(<AgGrid demo />);

    await waitFor(() => {
      expect(getByText(/test error/i)).toBeInTheDocument();
    });
  });
});
