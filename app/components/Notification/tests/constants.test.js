import { getNotificationsMock } from 'components/Notification/constants';
import { getNotificationsSuccessMock } from 'components/Notification/stub';
describe('Notification Constants', () => {
  it('should return the success result', () => {
    getNotificationsMock();
    expect(getNotificationsMock()).toEqual(getNotificationsSuccessMock());
  });
});
