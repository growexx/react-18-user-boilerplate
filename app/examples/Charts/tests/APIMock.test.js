import * as stub from '../stub/index';

describe('API Mock Service Tests', () => {
  it('Get API Call', async () => {
    expect((await stub.getAPIMock()).status).toEqual(1);
  });
});
