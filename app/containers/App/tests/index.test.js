import React from 'react';
import { Provider } from 'react-redux';
import { act, render } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { store } from 'configureStore';
import App from '../index';
import { ROUTES } from '../../constants';
import StorageService from '../../../utils/StorageService';
import { TOKEN_KEY } from '../../../utils/constants';

let globalStore;
const renderer = new ShallowRenderer();
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={[ROUTES.TEST_ADMIN_PAGE]}>
          <App />
        </MemoryRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<App />', () => {
  beforeAll(() => {
    globalStore = store;
    StorageService.set(TOKEN_KEY, 'TOKENVALUE');
  });
  it('should render and match the snapshot', () => {
    act(() => renderer.render(<App />));
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
  it('should render Div', () => {
    const { container } = componentWrapper();
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
});
