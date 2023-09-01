import React from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { store } from 'configureStore';
import ReactHookForm from '../index';
let globalStore;
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <Router history={history}>
        <ReactHookForm />
      </Router>
    </Provider>,
  );

describe('ReactHookForm Component', () => {
  beforeEach(() => {
    globalStore = store;
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });

  it('renders ReactHookForm component', () => {
    const screen = componentWrapper();

    expect(screen.getByLabelText(/First Name:/i)).toBeTruthy();
    expect(screen.getByLabelText(/Last Name:/i)).toBeTruthy();
    expect(screen.getByLabelText(/Email:/i)).toBeTruthy();
    expect(screen.getByLabelText(/Favorite color:/i)).toBeTruthy();

    expect(screen.getByText(/Submit/i)).toBeTruthy();
  });

  it('submits the form', () => {
    const screen = componentWrapper();

    fireEvent.change(screen.getByLabelText(/First Name:/i), {
      target: { value: 'John' },
    });

    fireEvent.change(screen.getByLabelText(/Last Name:/i), {
      target: { value: 'Doe' },
    });

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'johndoe@gmail.com' },
    });

    const getById = queryByAttribute.bind(null, 'id');
    const eventObject = {
      preventDefault: jest.fn(),
      target: {
        value: 'test',
        name: 'test',
        checked: true,
      },
    };

    fireEvent.click(getById(screen.container, 'employed'), eventObject);
    fireEvent.mouseDown(screen.getByRole('combobox'));

    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'ff0000',
      },
    });
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    fireEvent.change(screen.getByTestId('Notes'), eventObject);
    fireEvent.focus(screen.getByPlaceholderText('From'), eventObject);
    fireEvent.blur(screen.getByPlaceholderText('From'), eventObject);
    screen.getByPlaceholderText('From').blur();
    fireEvent.mouseDown(screen.getByPlaceholderText('From'));
    fireEvent.change(screen.getByPlaceholderText('From'), {
      target: {
        value: '2020-10-12',
      },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);
    const to = screen.getByPlaceholderText('To');
    fireEvent.mouseDown(to);
    fireEvent.change(to, {
      target: {
        value: '2021-10-28',
      },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);

    fireEvent.click(screen.getByText(/Submit/i));
    const button = screen.getByText('Submit');
    fireEvent.click(button);
  });
});
