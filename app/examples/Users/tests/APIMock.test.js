import { ACCOUNT_STATUS } from '../constants';
import * as stub from '../stub/index';

describe('API Mock Service Tests', () => {
  it('Get API Call', async () => {
    expect((await stub.getUsersAPIMock()).status).toEqual(1);
  });

  it('Get API Call, sort by', async () => {
    expect(
      (await stub.getUsersAPIMock({ sortKey: 'firstName', sortType: 1 }))
        .status,
    ).toEqual(1);

    expect(
      (await stub.getUsersAPIMock({ sortKey: 'firstName', sortType: -1 }))
        .status,
    ).toEqual(1);

    expect(
      (await stub.getUsersAPIMock({ sortKey: 'id', sortType: -1 })).status,
    ).toEqual(1);

    expect(
      (await stub.getUsersAPIMock({ sortKey: 'id', sortType: 1 })).status,
    ).toEqual(1);
  });

  it('Get API Call, Search', async () => {
    expect((await stub.getUsersAPIMock({ search: 'a' })).status).toEqual(1);
  });

  it('Get API Call, Status Filter', async () => {
    expect(
      (await stub.getUsersAPIMock({ status: ACCOUNT_STATUS.ACTIVE })).status,
    ).toEqual(1);
  });

  it('Get API Call, Status Filter', async () => {
    expect(
      (await stub.updateUserAPIMock(
        {
          firstName: 'john',
          lastName: 'doe',
          email: 'john.doe@growexx.com',
        },
        true,
      )).status,
    ).toEqual(1);
  });
});
