import React from 'react';
import { render, wait, fireEvent } from 'react-testing-library';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/dom';
import request from 'utils/request';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as ConnectedRouter } from 'redux-first-history/rr6';
import { createMemoryHistory } from 'history';

import RegisterQuestion from '../RegisterQuestion/index';
import ResetPassword from '../ResetPassword/index';
import { registerSecurityQuestion } from '../stub';
import configureStore from '../../../configureStore';

jest.mock('utils/request');

export async function selectOption(
  container,
  optionText,
  getByText,
  findByText,
  keyDownEvent,
) {
  const placeholder = getByText(container, 'Select...');
  fireEvent.keyDown(placeholder, keyDownEvent);
  await findByText(container, optionText);
  fireEvent.click(getByText(container, optionText));
}
const history = createMemoryHistory();

describe('<ResetPassword />', () => {
  it('should match snapshot', () => {
    const { store } = configureStore({}, history);

    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <ResetPassword />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('should render an <StyledSecurityQuestion> tag', () => {
  const {
    container: { firstChild },
  } = render(
    <ConnectedRouter history={history}>
      <RegisterQuestion />
    </ConnectedRouter>,
  );
  expect(firstChild.tagName).toEqual('DIV');
});

it('should render an <StyledSecurityQuestion> tag', () => {
  const {
    container: { firstChild },
  } = render(
    <ConnectedRouter history={history}>
      <RegisterQuestion />
    </ConnectedRouter>,
  );
  expect(firstChild.tagName).toMatchSnapshot();
});

it('should adopt any attribute', () => {
  const { container } = render(
    <ConnectedRouter history={history}>
      <RegisterQuestion attribute="test" />
    </ConnectedRouter>,
  );
  expect(container.firstChild.hasAttribute('attribute')).toBe(false);
});

it('should render and match the snapshot', () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
  const {
    container: { firstChild },
  } = render(
    <ConnectedRouter history={history}>
      <RegisterQuestion />
    </ConnectedRouter>,
  );
  expect(firstChild).toMatchSnapshot();
});

it('should render and match the snapshot', async () => {
  request.mockImplementation(registerSecurityQuestion);
  const {
    container: { firstChild },
  } = render(
    <ConnectedRouter history={history}>
      <RegisterQuestion />
    </ConnectedRouter>,
  );

  await wait(() => expect(request).toHaveBeenCalledTimes(0));
  expect(firstChild).toMatchSnapshot();
});

it('should renders properly and can handle submit', async () => {
  request.mockImplementationOnce(() => {
    registerSecurityQuestion({ question1: 'abc', answer: 'abc' });
  });
  const { getAllByRole, getByTestId } = render(
    <ConnectedRouter history={history}>
      <RegisterQuestion />
    </ConnectedRouter>,
  );

  const ques = getAllByRole('combobox');
  fireEvent.mouseDown(ques[0]);
  fireEvent.mouseDown(
    getByTestId('question1').querySelector('.ant-select-selector'),
  );
  fireEvent.click(getByTestId('question1'));

  await act(() => {
    fireEvent.mouseDown(
      getByTestId('question1').querySelector('.ant-select-selector'),
    );
    fireEvent.click(getByTestId('question1'));
    fireEvent.change(getByTestId('answer1'), { target: { value: 'Answer 1' } });

    fireEvent.mouseDown(
      getByTestId('question2').querySelector('.ant-select-selector'),
    );
    fireEvent.click(getByTestId('question2'));
    fireEvent.change(getByTestId('answer2'), { target: { value: 'Answer 2' } });

    fireEvent.mouseDown(
      getByTestId('question3').querySelector('.ant-select-selector'),
    );
    fireEvent.click(getByTestId('question3'));
    fireEvent.change(getByTestId('answer3'), { target: { value: 'Answer 3' } });

    fireEvent.click(getByTestId('submit_question'));
    expect(request).toHaveBeenCalledTimes(0);
  });

  await waitFor(() => {
    expect(request).toHaveBeenCalledTimes(0);
  });
});
