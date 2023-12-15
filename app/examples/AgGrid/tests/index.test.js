/**
 * Test the HomePage
 */

import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import request from 'utils/request';
import AgGrid from '../index';
import CustomStatusFilter from '../customStatusFilter';
import { statusFilters } from '../constants';

jest.mock('utils/request');

describe('<AgGrid />', () => {
  beforeEach(() => {
    delete window.location;
  });

  it('demo = false; should render and match the snapshot', async () => {
    window.location = {
      search: '?page=1&sortKey=email&sortType=-1&name=serena&status=Active',
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

describe('<AgGrid />: Custom Select Filter', () => {
  beforeEach(() => {
    delete window.location;
  });

  afterEach(() => {
    request.mockClear();
  });

  it('should be able to select filters from custom filter', async () => {
    window.location = {
      search: '?epicName=test',
    };
    const ref = React.createRef();
    const { getAllByRole, getAllByText } = render(
      <CustomStatusFilter
        ref={ref}
        field="epicName"
        selectOptions={statusFilters}
        parentFilterInstance={callback =>
          callback({ onFloatingFilterChanged: (a, b) => a + b })
        }
      />,
    );
    act(() => ref.current.onParentModelChanged({ filter: {} }));
    await waitFor(() => {
      fireEvent.blur(getAllByRole('combobox')[0]);
      fireEvent.focus(getAllByRole('combobox')[0]);
      fireEvent.mouseDown(getAllByRole('combobox')[0]);
      fireEvent.change(getAllByRole('combobox')[0], {
        target: {
          value: 'Suspended',
        },
      });
      fireEvent.click(
        document.querySelectorAll('.ant-select-item-option-content')[0],
      );
    });
    expect(getAllByText('Suspended')[0]).toBeInTheDocument();
  });

  it('should be able to select filters from custom filter', async () => {
    window.location = {
      search: '?epicName=test',
    };
    const ref = React.createRef();
    const { getAllByRole, getAllByText } = render(
      <CustomStatusFilter
        ref={ref}
        field="epicName"
        selectOptions={statusFilters}
        parentFilterInstance={callback =>
          callback({ onFloatingFilterChanged: (a, b) => a + b })
        }
      />,
    );
    act(() => ref.current.onParentModelChanged());
    await waitFor(() => {
      fireEvent.blur(getAllByRole('combobox')[0]);
      fireEvent.focus(getAllByRole('combobox')[0]);
      fireEvent.mouseDown(getAllByRole('combobox')[0]);
      fireEvent.change(getAllByRole('combobox')[0], {
        target: {
          value: 'Suspended',
        },
      });
      fireEvent.click(
        document.querySelectorAll('.ant-select-item-option-content')[0],
      );
    });
    fireEvent.focus(getAllByRole('combobox')[0]);
    expect(getAllByText('Suspended')[0]).toBeInTheDocument();
  });
});
