/**
 *
 * Tests for RealTimeChat
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from 'configureStore';
import RealTimeChat from 'examples/RealTimeChat/index';
import {
  getFireStoreCollectionReference,
  getFireStoreDocumentReference,
  getDataFromReference,
  setFirestoreDocumentData,
  addFirestoreDocumentData,
} from 'utils/firebase';
import {
  chatWindowStub,
  getSuccessMockSearchResults,
  getSuccessMockChatList,
  getSuccessDataFromReferenceSameEmail,
  getSuccessDataFromReferenceDiffEmail,
  getFailureMockChatList,
  getFailureResponse,
  getSuccessChatWindowData,
  getSuccessChatsSubscription,
  getCurrentUserMock,
  TEST_IDS,
  personOne,
} from 'examples/RealTimeChat/stub';

jest.mock('utils/firebase');
jest.mock('utils/Helper', () => ({
  getUserData: jest.fn().mockReturnValue({
    email: 'johndoe_0@gmail.com',
  }),
}));
const mockGetFireStoreCollectionReference = async (
  responseType,
  elseCase,
  chatParticipants,
  userSelection,
) => {
  getFireStoreCollectionReference
    .mockImplementationOnce(() => ({
      // real time chat component - for saving currentUserRef
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getCurrentUserMock(elseCase)
              : getFailureResponse(),
          ),
      })),
    }))
    .mockImplementationOnce(() => ({
      // Search User component - for saving search results
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getSuccessMockSearchResults()
              : getFailureResponse(),
          ),
      })),
    }))
    .mockImplementationOnce(() => ({
      // Chat List component - for getting the already done chats
      where: jest.fn().mockImplementationOnce(() => ({
        limit: jest.fn().mockImplementationOnce(() => ({
          onSnapshot: jest.fn(
            (snapshotCallbackFunction, snapshotCallbackErrorFunction) => {
              snapshotCallbackFunction(getSuccessMockChatList());
              snapshotCallbackErrorFunction(getFailureMockChatList());
              return jest.fn();
            },
          ),
          get: jest
            .fn()
            .mockImplementationOnce(() =>
              responseType === 'success'
                ? getSuccessMockSearchResults()
                : getFailureResponse(),
            ),
        })),
      })),
    }))
    .mockImplementationOnce(() => {
      // search user component - for selecting the user
      if (userSelection === 'dropdown') {
        return {
          where: jest.fn().mockImplementationOnce(() => ({
            get: jest
              .fn()
              .mockImplementation(() =>
                responseType === 'success'
                  ? getSuccessChatWindowData()
                  : getFailureResponse(),
              ),
          })),
        };
      }
      return {
        where: jest.fn().mockImplementationOnce(() => ({
          get: jest
            .fn()
            .mockImplementation(() =>
              responseType === 'success'
                ? getSuccessChatWindowData(elseCase, chatParticipants)
                : getFailureResponse(),
            ),
          onSnapshot: jest.fn(
            (snapshotCallbackFunction, snapshotCallbackErrorFunction) => {
              snapshotCallbackFunction(
                getSuccessChatWindowData(elseCase, chatParticipants),
              );
              snapshotCallbackErrorFunction(getFailureResponse());
              return jest.fn();
            },
          ),
        })),
      };
    })
    .mockImplementationOnce(() => ({
      // chat room component - for successfully getting the chat window
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getSuccessChatWindowData(elseCase, chatParticipants)
              : getFailureResponse(),
          ),
      })),
    }))
    .mockImplementationOnce(() => ({
      // chat room component - for successfully getting the chat window
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getSuccessChatWindowData(elseCase, chatParticipants)
              : getFailureResponse(),
          ),
      })),
    }))
    .mockImplementationOnce(() => ({
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getSuccessChatWindowData(elseCase, chatParticipants)
              : getFailureResponse(),
          ),
        onSnapshot: jest.fn(
          (snapshotCallbackFunction, snapshotCallbackErrorFunction) => {
            snapshotCallbackFunction(
              getSuccessChatWindowData(elseCase, chatParticipants),
            );
            snapshotCallbackErrorFunction(getFailureResponse());
            return jest.fn();
          },
        ),
      })),
    }));
};
export const mockGetFireStoreDocumentReference = async () => {
  getFireStoreDocumentReference
    .mockImplementationOnce(() => chatWindowStub(0).joined[0])
    .mockImplementation(() => ({
      onSnapshot: jest.fn(async snapshotCallbackFunction => {
        snapshotCallbackFunction(getSuccessChatsSubscription());
        jest.fn();
        return '';
      }),
    }));
};

const mockGetDataFromReference = async (responseType, emailType) => {
  if (responseType === 'success') {
    if (emailType === 'same') {
      getDataFromReference.mockImplementation(() =>
        getSuccessDataFromReferenceSameEmail(),
      );
    } else {
      getDataFromReference
        .mockImplementationOnce(() => getSuccessDataFromReferenceDiffEmail())
        .mockImplementationOnce(() => getSuccessDataFromReferenceSameEmail())
        .mockImplementationOnce(() => getSuccessDataFromReferenceDiffEmail())
        .mockImplementationOnce(() => getSuccessDataFromReferenceDiffEmail())
        .mockImplementation(() => getSuccessDataFromReferenceDiffEmail());
    }
  } else if (responseType === 'successWithFailure') {
    getDataFromReference
      .mockImplementationOnce(() => getSuccessDataFromReferenceDiffEmail())
      .mockImplementation(() => getFailureResponse());
  } else {
    getDataFromReference.mockImplementation(() => getFailureResponse());
  }
};

const mockSetFirestoreDocumentData = async responseType => {
  if (responseType === 'success') {
    setFirestoreDocumentData.mockImplementation(() => Promise.resolve());
  } else {
    setFirestoreDocumentData.mockImplementation(() => getFailureResponse());
  }
};
const mockAddFirestoreDocumentData = async responseType => {
  if (responseType === 'success') {
    addFirestoreDocumentData.mockImplementation(() =>
      Promise.resolve({ id: '2810' }),
    );
  } else {
    addFirestoreDocumentData.mockImplementation(() => getFailureResponse());
  }
};
let globalStore;
const props = {
  storeData: {
    currentUserRef: personOne,
    receiverUserRefs: [],
    receiverUserValues: [],
    currentUserValue: {},
    searchResults: [],
    loading: false,
    selectedChatWindow: '',
  },
  updateAction: jest.fn(),
};
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <RealTimeChat {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<SearchUser />', () => {
  beforeAll(() => {
    const { store } = configureStore({}, browserHistory);
    globalStore = store;
  });
  afterEach(() => {
    getFireStoreCollectionReference.mockReset();
    setFirestoreDocumentData.mockReset();
    getFireStoreDocumentReference.mockReset();
  });
  it('Getting the users for dropdown fails', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('failure');
    mockGetDataFromReference('success', 'same');
    const { getByTestId, getByRole } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    expect(getByTestId(TEST_IDS.CREATE_CHAT)).toBeInTheDocument();
  });
  it('Current User data is not available', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', true);
    mockGetDataFromReference('success', 'same');
    const { getByTestId, getByRole } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    expect(getByTestId(TEST_IDS.CREATE_CHAT)).toBeInTheDocument();
  });
  it('Should select the value from dropdown', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetDataFromReference('success', 'same');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    const { getByRole, getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    expect(getByTestId(TEST_IDS.CLOSE_ICON)).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should select the value from dropdown and chatWindow is already open and user tries to click on same user', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    const { getByRole, getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    expect(getByTestId(TEST_IDS.CLOSE_ICON)).toBeTruthy();
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should select the value from dropdown and chatWindow is already open', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    const { getByRole, getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    expect(getByTestId(TEST_IDS.CLOSE_ICON)).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should select the value from dropdown and chatWindow is already open and chat is not equal', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    const { getByRole, getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    expect(getByTestId(TEST_IDS.CLOSE_ICON)).toBeTruthy();
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '8',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
});
describe('<ChatList />', () => {
  beforeAll(() => {
    const { store } = configureStore({}, browserHistory);
    globalStore = store;
  });
  afterEach(() => {
    getFireStoreCollectionReference.mockReset();
    setFirestoreDocumentData.mockReset();
    getFireStoreDocumentReference.mockReset();
  });
  it('Should click on chat button', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should click on chat button and chat window is already open', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockSetFirestoreDocumentData('success');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.CLOSE_ICON));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should click on chat button and chat window is already open with other chat click', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockSetFirestoreDocumentData('success');
    const { getByText, getAllByTestId, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getAllByTestId(TEST_IDS.OPEN_CHAT_WINDOW)[0]);
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.click(getAllByTestId(TEST_IDS.OPEN_CHAT_WINDOW)[1]);
    await waitForElement(() => getByTestId(TEST_IDS.CLOSE_ICON));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should fetch the chat list and does not contain the loggedIn email address', async () => {
    getFireStoreCollectionReference.mockReset();
    mockGetFireStoreDocumentReference();
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreCollectionReference('success');
    const { getByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    expect(getByText('johndoe_1')).toBeInTheDocument();
    getFireStoreCollectionReference.mockReset();
  });
  it('Should fetch the chat list and contain the loggedIn email address', async () => {
    getFireStoreCollectionReference.mockReset();
    mockGetFireStoreDocumentReference();
    mockGetDataFromReference('success', 'same');
    mockGetFireStoreCollectionReference('success');
    const { queryByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    expect(queryByText('johndoe_0')).not.toBeInTheDocument();
    getFireStoreCollectionReference.mockReset();
  });
  it('Should fetch the chat list with failure cases', async () => {
    getDataFromReference.mockReset();
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('failure');
    const { queryByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByTestId(TEST_IDS.CREATE_CHAT));
    expect(queryByText('johndoe_1')).not.toBeInTheDocument();
  });
});
describe('<ChatRoom />', () => {
  beforeAll(() => {
    const { store } = configureStore({}, browserHistory);
    globalStore = store;
  });
  afterEach(() => {
    getFireStoreCollectionReference.mockReset();
    setFirestoreDocumentData.mockReset();
    getFireStoreDocumentReference.mockReset();
  });
  it('Should click on chat button with personal chat window and write message to send it', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    await waitForElement(() => getByText('TestMessage'));
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
  it('Should click on chat button and write message to send it', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    await waitForElement(() => getByText('TestMessage'));
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
  it('Should click on chat button and the joined window is a new chat', async () => {
    mockAddFirestoreDocumentData('success');
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', true, '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    // state gets cleared
  });
  it('Should click on chat button and sending message fails', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    mockSetFirestoreDocumentData('failure');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    await waitForElement(() => getByText('TestMessage'));
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
  it('Should click on chat button and getting user refs fails', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('successWithFailure');
    mockSetFirestoreDocumentData('failure');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    await waitForElement(() => getByText('TestMessage'));
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
});
