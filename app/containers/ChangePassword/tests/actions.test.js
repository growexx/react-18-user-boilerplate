import * as actions from '../actions';
import * as types from '../constants';

describe('ChangePassword', () => {
  it('should create an action to update fields', () => {
    const value = 'testValue';
    // change current password
    const expectedAction = {
      type: types.CHANGE_CURRENT_PASSWORD,
      value,
    };
    expect(
      actions.updateField('currentPassword', expectedAction.value),
    ).toEqual(expectedAction);

    // change new password

    expectedAction.type = types.CHANGE_NEW_PASSWORD;
    expect(actions.updateField('newPassword', expectedAction.value)).toEqual(
      expectedAction,
    );

    // change confirm new password
    expectedAction.type = types.CHANGE_CONFIRM_NEW_PASSWORD;
    expect(
      actions.updateField('confirmNewPassword', expectedAction.value),
    ).toEqual(expectedAction);

    // change loading

    expectedAction.type = types.LOADING;
    expect(actions.updateField('loading', expectedAction.value)).toEqual(
      expectedAction,
    );

    // default case
    expect(actions.updateField('default', expectedAction.value)).toEqual(
      undefined,
    );
  });
  it('should create an action to fire submit', () => {
    const expectedAction = {
      type: types.SUBMIT_DATA,
    };
    expect(actions.fireSubmit()).toEqual(expectedAction);
  });
});
