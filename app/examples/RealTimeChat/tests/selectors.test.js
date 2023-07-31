import makeSelectRealTimeChat, {
  stateObject,
} from 'examples/RealTimeChat/selectors';
import { initialState } from 'examples/RealTimeChat/reducer';
import { REDUCER_KEY } from 'examples/RealTimeChat/constants';
jest.mock('utils/firebase', () => ({
  getFireStoreDocumentReference: jest.fn(),
}));
describe('RealTimeChat Selectors Testing', () => {
  it('Testing makeSelectRealTimeChat', () => {
    const mockState = {
      [REDUCER_KEY]: {
        currentUserRef: '',
        receiverUserRefs: [],
        receiverUserValues: [],
        currentUserValue: {},
        searchResults: [],
        loading: false,
        selectedChatWindow: '',
      },
    };
    const result = {
      currentUserRef: '',
      receiverUserRefs: [],
      receiverUserValues: [],
      currentUserValue: {},
      searchResults: [],
      loading: false,
      selectedChatWindow: ['testValues', 'testValues'],
    };
    const sel = makeSelectRealTimeChat(mockState);
    const actual = sel.resultFunc(result);
    expect(actual).toEqual(result);
  });
  it('Testing selectChangePasswordDomain ', () => {
    const mockState = {
      [REDUCER_KEY]: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: '',
        loading: false,
        success: '',
      },
    };
    const initialMockState = {};
    expect(stateObject(mockState)).toEqual(mockState[REDUCER_KEY]);
    // with initial state
    expect(stateObject(initialMockState)).toBe(initialState);
  });
});
